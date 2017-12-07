# Changelog

## 2.0.0-rc.1 — 2017-12-07

* **`upgrade` code base to hapi v17**
* `add` season and episode Mongoose models
* `add` sample data for seasons and episodes
* `update` data loader to import seasons and episodes
* `add` basic footer
* `add` paginator utility
* `add` TV shows overview with pagination
* `update` Eslint config to use `standard`
* `add` handlebars helpers for `isEqual`, `repeat`
* `add` sample tests to get started with testing

## 1.3.1 — 2017-11-23

* `add` step to create `secrets.env` from sample file in readme
* `update` font from Rubik to Inter UI
* `update` Eslint config
* `remove` duplicated layouts

## 1.3.0 — 2017-11-07

* `add` movie and TV show sample data
* `add` NPM command to import the sample data into MongoDB: `npm run pumpitup`
* `update` readme with instructions to load the sample data

## 1.2.0 — 2017-11-03

* `add` TRAKT_CLIENT_ID and TRAKT_CLIENT_SECRET environment variables to `secrets.env.sample`
* `add` required Node.js v6 engine to `package.json`
* `add` illustrative tests
* `update` profile view and move to dedicated folder
* `update` dependencies

## 1.1.0 — 2017-09-14

* `add` PORT environment variable to `secrets.env.sample`
* `update` mailer to use native Node.js promises
* `update` mailer to catch and proceed request on errors
* `fix` template preparation promise call in mailer
* `rename` file for environment variables from `secrets.env.example` to `secrets.env.sample`

## 1.0.0 — 2017-09-04

* `1.0.0` 📺 🤘
