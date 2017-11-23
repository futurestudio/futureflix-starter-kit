[![Futureflix](https://futurestud.io/blog/content/images/2017/09/futureflix-movie.jpg)](http://learnhapi.com)

# learn hapi — Starter Files
This repository contains the **Futureflix Starter Kit** for the [learn hapi](http://learnhapi.com) learning path.

You’ll implement Futureflix as a sample app while following the tutorials in this [hapi](https://hapijs.com) learning path.

At this point, the current project’s implementation is only available for enrolled students. If you’re part of the Future Studio University, you’ve access to the code, hosted on GitLab.


## Requirements
To run the **Futureflix Starter Kit**, please install the following dependencies:

- Node.js v6.x or later
- NPM or Yarn to install the project’s dependencies
- [Vagrant](https://www.vagrantup.com/) or a [MongoDB](https://docs.mongodb.com/manual/installation/) instance on your machine

Seems doable, huh? 😃


## Setup and Run
To run your own Futureflix instance, clone this repository, install the dependencies, start a MongoDB instance in a Vagrant VM or on your own machine.

```bash
# clone repository
git clone https://github.com/fs-opensource/futureflix-starter-kit.git
cd futureflix-starter-kit

# install dependencies
npm i

# start Vagrant box
vagrant up

# create your secrets.env file from secrets.env.example
cp secrets.env.sample secrets.env

# import sample data
npm run pumpitup

# start the server
node server.js

# that’s it :)
```

The starter kit doesn’t contain any logging. If you don’t see any errors while starting the `server.js`,
[visit localhost:3000](http://localhost:3000). Have fun!


## Getting Help
At this point, there’s no Slack channel or support group. If you need help with your implementation, please use email. We’re active on emails and reply as soon as possible.

This repository accompanies you with the **Futureflix Starter Kit** and is not meant to be a support channel.


## Sending Pull Requests
In case you found a different way to implement a feature, we’re happy to hear about it! Within the videos we’re using the code of this repository and want to keep it as close as possible.

It’s unlikely that we accept a pull request with functionality changes.

Error fixes and additional explanations are always welcome. If you find something, we absolutely appreciate your pull request.

Make it rock!
