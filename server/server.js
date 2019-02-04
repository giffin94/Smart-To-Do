"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const path = require('path'); // this ensures the path will join, even if too many/too few slashes
app.use(methodOverride('_method'));

// Seperated Routes for each Resource
const usersRoutes = require("../routes/users");
const profRoutes = require("../routes/profile");
const verificationRoutes = require("../routes/verify")
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['xkcd'],
  maxAge: 24 * 60 * 60 * 1000 //24 hours
}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: path.join(__dirname, "/../styles"),
  dest: path.join(__dirname, "/../public/styles"),
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use("/your-lists", usersRoutes(knex));
app.use("/profile", profRoutes(knex));
app.use("/verify", verificationRoutes(knex));

app.get("/", (req, res) => {
  if (req.session.user_id) {
    res.render("index");
  } else {
    res.render("welcome");
  }
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
