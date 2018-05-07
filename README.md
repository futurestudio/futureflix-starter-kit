
<div align="center">
  <br/>
  <a href="http://learnhapi.com">
    <img src="https://futurestud.io/blog/content/images/2018/01/futureflix-teaser.jpg" />
  </a>
  <br/>
  <br/>
  <p>
    Your starter kit for the <a href="http://learnhapi.com"><strong>learn hapi</strong></a> learning path.
    <br/>
    You’ll implement a real-world app from zero to hero!
  </p>
  <br/>
  <p>
    <a href="https://futureflix.space"><strong>Demo</strong></a> ·
    <a href="#setup-and-run"><strong>Setup</strong></a> ·
    <a href="#thank-you-with-a-hug"><strong>Hugs</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://travis-ci.org/fs-opensource/futureflix-starter-kit">
      <img src="https://travis-ci.org/fs-opensource/futureflix-starter-kit.svg?branch=master"/>
    </a>
    <a href="https://snyk.io/test/github/fs-opensource/futureflix-starter-kit">
      <img src="https://snyk.io/test/github/fs-opensource/futureflix-starter-kit/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fs-opensource/futureflix-starter-kit" style="max-width:100%;">
    </a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> for Futureflix updates!</em>
  </p>
</div>


---

# learn hapi — Starter Files
This repository contains the **Futureflix Starter Kit** for the **[learn hapi](http://learnhapi.com)** learning path.

You’ll implement Futureflix as a sample app while following the tutorials in this hapi (hapi.js) learning path.

The finished project’s implementation is only available for Future Students. If you’re part of the Future Studio University, you’ve access to the code (hosted on GitLab).


## Requirements
> Node.js v8.x with `async/await`
>
> This version of Futureflix uses **hapi v17**. For hapi v16, use a [`1.x` release](https://github.com/fs-opensource/futureflix-starter-kit/releases)

The Futureflix Starter Kit uses hapi v17 and has full `async/await` support.

**Requirements**

- Node.js **v8.x** or later
- NPM/Yarn to install the project’s dependencies
- [Vagrant](https://www.vagrantup.com/) or a [MongoDB](https://docs.mongodb.com/manual/installation/) instance on your machine

Download the Futureflix Starter Kit in version [`1.x` from this repo’s release page](https://github.com/fs-opensource/futureflix-starter-kit/releases) if you want to run it with Node.js v6.x.

Seems doable, huh? 😃


## Setup and Run
To run your own Futureflix instance, clone this repository, install the dependencies, start a MongoDB instance in a Vagrant VM or on your own machine.

```bash
# clone repository
git clone https://github.com/fs-opensource/futureflix-starter-kit.git
cd futureflix-starter-kit

# install dependencies
npm i

# start the Vagrant box
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
At this point, there’s no Slack channel or support group. If you need help with your implementation, please email us or send a tweet [@futurestud_io](https://twitter.com/futurestud_io). We’re active on emails and reply as soon as possible.

At this point, there’s no Slack channel or support group. If you need help with your implementation, please email us. We’re active on emails and reply as soon as possible.


## Sending Pull Requests
In case you found a different way to implement a feature, we’re happy to hear about it! Within the videos we’re using the code of this repository and want to keep it as close as possible.

Error fixes and additional explanations are always welcome. If you find something, we absolutely appreciate your pull request.

Make it rock!


## Thank You with a Hug!
It’s great to see you exploring this repository. Really! Dig through the code and hopefully you’ll take wins away ❤️


### Sample data from trakt.tv
Movie and TV show sample data for Futureflix comes from [trakt.tv](https://trakt.tv/). Track your progress on watched movies and shows, never forget where you left off a week ago! Trakt is a nice platform with dozens of apps for any client.
We’re not payed to say that 😅


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
