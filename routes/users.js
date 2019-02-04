"use strict";

const express = require('express');
const userRoutes  = express.Router();

module.exports = (knex) => {

  userRoutes.get('/', (request, response) => {
    knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', '1')
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
        if (rows.length) {
          response.json(rows);
        } else {
          console.log('No results found!');
        }
      })
  });

  //insert new to-do list (FOR USER_ID 1 CURRENTLY)
  userRoutes.put('/new-item', (request, response) => {
    // query apis to return category
    knex('to_dos')
    .insert([{
      to_do: `${item}`, //change to req.body.item or whatever it is
      user_id: "1", //should be from req.body (not hardcoded)
      cat_id: `${cat}`, //same as item
      priority: "false"
    }])
    .then( () => {
      console.log("insert complete!");
    })
    .catch( (error) => {
      console.error(error);
    });
  });

  userRoutes.patch('/recat-item', (request, response) => {
    console.log(request.body);
    let currentItem = request.body.id;
    let newCat = request.body.catID;
    knex('to_dos')
    .where({id: `${currentItem}`})
    .update({ cat_id: `${newCat}` })
    .then( () => {
      console.log("Insert complete!");
      knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', '1')
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
        if (rows.length) {
          response.json(rows);
        } else {
          console.log('No results found!');
        }
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });

  userRoutes.patch('/prioritize-item', (request, response) => {
    let itemID = request.body.id;
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
        .where('user_id', '1')
        .select('to_dos.id', 'to_do', 'priority', 'category')
        .then((rows) => {
          if (rows.length) {
            response.json(rows);
          } else {
            console.log('No results found!');
          }
        })
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });


  userRoutes.delete('/delete-item', (request, response) => {
    let thisItem = request.body.id;
    knex('to_dos')
    .where({id: `${thisItem}`})
    .del()
    .then( () => {
      console.log("Item deleted!");
      knex('to_dos')
      .leftJoin('categories', 'categories.id', '=', 'cat_id')
      .where('user_id', '1')
      .select('to_dos.id', 'to_do', 'priority', 'category')
      .then((rows) => {
        if (rows.length) {
          response.json(rows);
        } else {
          console.log('No results found!');
        }
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  });

  return userRoutes;
}
