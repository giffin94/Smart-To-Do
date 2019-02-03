"use strict";

const express = require('express');
const profRoutes  = express.Router();

module.exports = (knex) => {
  
  profRoutes.get("/", (req, res) => {
    res.render('profile');
  });

  profRoutes.get("/info", (req, res) => {
    knex('users')
    .where('id', '1')
    .select('name', 'email')
    .then((rows) => {
      if (rows.length) {
        console.log(rows);
        res.json(rows);
      } else {
        console.log('No results found!');
      }
    })
  });


  return profRoutes;
}
