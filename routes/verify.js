const express = require('express');
const verificationRoutes  = express.Router();
const index = '../views/index.ejs';

module.exports = (knex) => {

  verificationRoutes.put('/reg', (req, res) => {

    let veriFlag = true;

    knex('users')
    .select()
    .then((rows) => {
      rows.forEach( (row) => {
        if(row.email === req.body.email) {
          return veriFlag = false;
        }
      })
    })
    .then(() => {
      console.log(veriFlag);
      if (veriFlag) {
        knex('users')
        .insert([{
          name: req.body.userName,
          email: req.body.email,
          password: req.body.password 
        }])
        .then(() => {
          knex('users')
          .where({email: `${req.body.email}`})
          .select('id')
          .then((rows) => {
            req.session.user_id = rows[0].id;
            console.log(rows);
            res.sendStatus(200);
          });
        }) 
      } else {
        res.status(403).json([{ error: 1 }]);
      }
    })
  });
  return verificationRoutes;
}