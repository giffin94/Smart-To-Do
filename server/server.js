"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const path = require('path'); // this ensures the path will join, even if too many/too few slashes

// Seperated Routes for each Resource
const usersRoutes = require("../routes/users");
const apiRoutes = require("../routes/apis");

app.use(morgan('dev'));

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
app.use("/apis", apiRoutes());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
