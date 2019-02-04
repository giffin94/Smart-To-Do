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

  profRoutes.patch('/info', (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const userID = req.session.user_id;
    knex('users')
      .where('id', `${userID}`)
      .update({
        email,
        name: userName
      })
      .then(() => {
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
      })
  })


  return profRoutes;
}
