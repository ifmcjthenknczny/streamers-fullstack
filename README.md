# STREAMSHACK - streamers knowledge base

> Responsive fullstack webpage allowing you to add, rate and view streamers.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

This project allows users to add, rate and view streamers, also in details. Adding new streamers to database is implemented through submission form and new entries, as well as new votes, are passed immidiately to the streamers list.Both a form a streamers list make up the homepage. Another page is Streamer record, which presents details about streamer of given id.
Everything is validated by Joi, error-safe by using a proper hook as well as expected responses from endpoints are typed in contracts. ESLint is configured.

## Technologies used

- HTML5
- Sass
- Typescript 4.9
- Node.js
- React 18 & React Router & Redux
- MongoDB / Mongoose

## How to run it?

After providing valid MONGO_URL in env variables, you need to run client and server separately.
Run server first by running command `npm start` (for Linux-based systems) in /server directory (`npm run startwin` for Windows OS). This command will run your server as well as copy contract from "shared" folder to "client/src" directory.
Then you can run frontend. Use `npm start` in client directory.
There you go! The app is up and running.
If you want to run the app not locally, you'd have to change `SERVER_HOST` variable in contract in order to requests from server to run properly. Default server host is `http://localhost:5000/`.

## Status

Project is: _finished_

## Inspiration

Build with given requirements as an entry task for one of IT companies.

## Contact

Created purely by Maciej Konieczny.
