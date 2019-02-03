"use strict";

const express = require('express');
const profRoutes  = express.Router();

module.exports = (knex) => {
  
  profRoutes.get("/", (req, res) => {
    res.render('profile');
  });


  return profRoutes;
}
