"use strict";

const express = require('express');
const userRoutes  = express.Router();
const queryAPIs = require('./util/apis-helpers');

module.exports = (knex) => {

  userRoutes.get('/', (request, response) => {
    let userID = request.session.user_id;
    knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', `${userID}`)
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
          response.json(rows);
      })
  });

  userRoutes.put('/new-item', (request, response) => {
    const rawInput = request.body;
    let searchTerm = rawInput.item;
    let userID = request.session.user_id;

    queryAPIs.searchYelp(searchTerm)
      .then((data) => {
        if (data) {
          sendNewToKnex(2); //.then((data) => { // 2 - eat
        } else {
          queryAPIs.searchWikip(searchTerm)
            .then((data) => {
              sendNewToKnex(data);//.then((data) => { // 1 - read, 3 - buy, 4 - movies
          }).catch(() => sendNewToKnex(null)); // null - uncategorized
        }
      }).catch(() => console.log(data)); // null - uncategorized

    function sendNewToKnex(category) {
      return new Promise((resolve, reject) => {
        knex('to_dos')
          .insert([{
            to_do: searchTerm,
            user_id: userID, // to be got from the sessions.cookie
            cat_id: category,
            priority: "false"
          }])
          .then(() => {
            knex('to_dos')
            .leftJoin('categories', 'categories.id', '=', 'cat_id')
            .where('user_id', `${userID}`)
            .select('to_dos.id', 'to_do', 'priority', 'category')
            .then((rows) => {
                response.json(rows);
            })
          })
          .catch( (error) => {
            console.error(error);
          });
      });
    }

  });

  userRoutes.patch('/recat-item', (request, response) => {
    let currentItem = request.body.id;
    let newCat = request.body.catID;
    let userID = request.session.user_id;

    knex('to_dos')
    .where({id: `${currentItem}`})
    .update({ cat_id: `${newCat}` })
    .then( () => {
      console.log("Insert complete!");
      knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', `${userID}`)
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
          response.json(rows);
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });

  userRoutes.patch('/prioritize-item', (request, response) => {
    let itemID = request.body.id;
    let userID = request.session.user_id;
    knex('to_dos')
    .where({id: `${itemID}`})
    .select('priority')
    .then( (rows) => {
      knex('to_dos')
      .where({id: `${itemID}`})
      .update({ priority:  `${!(rows[0].priority)}`})
      .then( () => {
        console.log("Update complete!");
        knex('to_dos')
        .leftJoin('categories', 'categories.id', '=', 'cat_id')
        .where('user_id', `${userID}`)
        .select('to_dos.id', 'to_do', 'priority', 'category')
        .then((rows) => {
            response.json(rows);
        })
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });


  userRoutes.delete('/delete-item', (request, response) => {
    let thisItem = request.body.id;
    let userID = request.session.user_id;
    knex('to_dos')
    .where({id: `${thisItem}`})
    .del()
    .then( () => {
      console.log("Item deleted!");
      knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', `${userID}`)
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
          response.json(rows);
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });

  return userRoutes;
}
