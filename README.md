# Welcome to SmartCAT!
SmartCAT is an auto-categorizing to do list. Simply type in something you would like to do, and SmartCAT's algorithms will categorize your entry for you! 

By querying Wikipedia and Yelp APIs, SmartCAT is able to categorize any entry according to one of these categories:
* EAT
* WATCH
* READ
* BUY

(Note: SmartCAT's Yelp API query is set to Vancouver, BC.)

## Screenshots
![screenshot](/docs/screenshot.jpg)
![auto-cat](/docs/auto-cat.gif)

## Installation/Setup
1. Clone the project to your computer and navigate to the project directory.
2. Run `npm install` to install dependencies.
3. Create a new PostgreSQL database on your system and remember the credentials.
4. Set up .env file with credentials from your new database. (Copy .env.example in the project directory)
5. Run knex database migration and seed.
6. Run `npm run local` to start the server.
7. Navigate to `localhost:8080` in your browser.

## Dependencies
- body-parser 1.15.2
- cookie-session 2.0.0
- dotenv
- ejs
- express 4.13.4
- jquery
- knex 0.16.3
- node-wikipedia
- omdb-client
- pg
- popper.js 1.14.7
- yelp-fusion 2.2.1

## Dev Team
SmartCAT was built in collaboration by [Aedan Giffin](https://github.com/giffin94) and [Shmoo Ritchie](https://github.com/shmoo-tidy).
