# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # search for boxes at https://atlas.hashicorp.com/search
  config.vm.box = "ubuntu/xenial64"

  # set custom name to remove "folder+default+timestamp"
  config.vm.provider "virtualbox" do |v|
    v.name = "futureflix_vagrant"
  end

  # MongoDB
  config.vm.network :forwarded_port, guest: 27017, host: 27017
  # Redis
  config.vm.network :forwarded_port, guest: 6379, host: 6379

  # Create a private network, which allows host-only access to the machine
  # using a specific IP
  config.vm.network :private_network, ip: "192.168.33.10"

  # Provisioning
  config.vm.provision :shell, inline: <<-SHELL
    # Add MongoDB Source
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

    echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    sudo apt-get update

    # MongoDB Install & Setup
    sudo apt-get install -y mongodb-org

    # content for systemd mongodb.service
    mongoService="
      [Unit]
      Description=High-performance, schema-free document-oriented database
      After=network.target

      [Service]
      User=mongodb
      ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

      [Install]
      WantedBy=multi-user.target
    "

    # put mongodb.service into place to be managable by systemctl
    sudo echo "$mongoService" > /etc/systemd/system/mongodb.service

    # bind MongoDB to the world \o/ raise the gates!
    sudo sed -i 's/bindIp: 127.0.0.1/bindIp: 0.0.0.0/g' /etc/mongod.conf

    # restart MongoDB, in case it wasn't running before
    sudo systemctl restart mongodb
    sudo systemctl enable mongodb

    # Redis, all in one
    # install
    sudo add-apt-repository -y ppa:chris-lea/redis-server
    sudo apt-get update
    sudo apt-get install -y redis-server

    # config
    sudo cp /etc/redis/redis.conf /etc/redis/redis.conf.old
    sudo cat /etc/redis/redis.conf.old | grep -v bind > /etc/redis/redis.conf
    sudo echo "bind 0.0.0.0" >> /etc/redis/redis.conf

    ## start
    sudo update-rc.d redis-server defaults
    sudo systemctl restart redis-server
  SHELL

end
