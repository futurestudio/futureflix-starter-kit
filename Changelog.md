# Changelog

## 2.1.2 — 2017-0x-xx
- `add` `.prettierignore` file to ignore markdown
- `update` refactor method in mailer that prepares the template from promises to be fully async/await


## 2.1.1 — 2017-02-20
- `add` Demo link in Readme
- `update` dependencies
- `update` dark to light icon in hero
- `update` Mongoose connection and throw connection errors
- `fix` sample data loader path to models due to project structure changes
- `ignore` haters


## 2.1.0 — 2017-01-16
- `add` views for watchlist and search results
- `add` Handlebars helper `isOnWatchlist`
- `update` Bulma from `0.5` to `0.6`
- `update` to Bulma's new navbar and add search input
- `update` Handlebars partials for hero and navbar
- `update` design for movie and TV show detail pages


## 2.0.0 — 2017-12-15
- `add` thank you section in readme
- `update` readme: add Node.js v8.x requirement, link to download for previous version
- `update` sample data and relationships
- `update` getting started tests
- `update` paginator utility to expose more fields
- `update` Vagrantfile with minor reformats


## 2.0.0-rc.1 — 2017-12-07
- --`upgrade` code base to hapi v17--
- `add` season and episode Mongoose models
- `add` sample data for seasons and episodes
- `update` data loader to import seasons and episodes
- `add` basic footer
- `add` paginator utility
- `add` TV shows overview with pagination
- `update` Eslint config to use `standard`
- `add` handlebars helpers for `isEqual`, `repeat`
- `add` sample tests to get started with testing


## 1.3.1 — 2017-11-23
- `add` step to create `secrets.env` from sample file in readme
- `update` font from Rubik to Inter UI
- `update` Eslint config
- `remove` duplicated layouts


## 1.3.0 — 2017-11-07
- `add` movie and TV show sample data
- `add` NPM command to import the sample data into MongoDB: `npm run pumpitup`
- `update` readme with instructions to load the sample data


## 1.2.0 — 2017-11-03
- `add` TRAKT_CLIENT_ID and TRAKT_CLIENT_SECRET environment variables to `secrets.env.sample`
- `add` required Node.js v6 engine to `package.json`
- `add` illustrative tests
- `update` profile view and move to dedicated folder
- `update` dependencies


## 1.1.0 — 2017-09-14
- `add` PORT environment variable to `secrets.env.sample`
- `update` mailer to use native Node.js promises
- `update` mailer to catch and proceed request on errors
- `fix` template preparation promise call in mailer
- `rename` file for environment variables from `secrets.env.example` to `secrets.env.sample`


## 1.0.0 — 2017-09-04
- `1.0.0` 📺 🤘
