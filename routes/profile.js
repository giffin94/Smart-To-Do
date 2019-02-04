"use strict";

const express = require('express');
const profRoutes  = express.Router();

module.exports = (knex) => {

  profRoutes.get("/", (req, res) => {
    res.render('profile');
  });

  profRoutes.get("/info", (req, res) => {
    let userID = req.session.user_id;
    knex('users')
    .where('id', `${userID}`)
    .select('name', 'email')
    .then((rows) => {
      if (rows.length) {
        res.json(rows);
      } else {
        console.log('No results found!');
      }
    })
  });


  return profRoutes;
}
