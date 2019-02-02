exports.seed = function(knex, Promise) {

  return Promise.all([
    knex('users').del(),
    knex('categories').del(),
    knex('to_dos').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE to_dos_id_seq RESTART WITH 1'),
  ])
  .then(() => {
    return knex('categories').insert([
      { id: 1, category: 'read' },
      { id: 2, category: 'eat' },
      { id: 3, category: 'buy' },
      { id: 4, category: 'watch' },
      { id: 5, category: 'finished' }
    ]); 
  })
    .then(() => {
      return knex('users').insert([
        { name: 'Mariah', email: 'mariah_1970@aol.com', password: '123abc'},
        { name: 'Cariah', email: 'cariah_1970@aol.com', password: 'abc123'},
        { name: 'Sariah', email: 'sariah_1970@aol.com', password: '1a2b3c'},
        { name: 'Fariah', email: 'fariah_1970@aol.com', password: 'a1b2c3'}
      ])
    })
    .then(() => {
      return knex('to_dos').insert([ // review schema/ERD
        { to_do: 'McDonald\'s', priority: true, user_id: 1, cat_id: 2 },
        { to_do: 'Spiderverse', priority: true, user_id: 1, cat_id: 4 },
        { to_do: 'bananas', priority: false, user_id: 1, cat_id: 3 },
        { to_do: 'Seventeen Magazine', priority: true, user_id: 1, cat_id: 1 },
        { to_do: 'shoes', priority: false, user_id: 1, cat_id: 5 },
        { to_do: 'something_crazy', priority: true, user_id: 1, cat_id: null },
        { to_do: 'Cactus Club', priority: false, user_id: 1, cat_id: 2 },
        { to_do: 'Captain America', priority: false, user_id: 1, cat_id: 4 },
        { to_do: 'catfood', priority: false, user_id: 1, cat_id: 3 },
        { to_do: 'Goosebumps', priority: true, user_id: 1, cat_id: 1 },
        { to_do: 'shirts', priority: false, user_id: 1, cat_id: 5 },
        { to_do: 'something_unexpected', priority: true, user_id: 1, cat_id: null },
        { to_do: 'Wendy\'s', priority: false, user_id: 1, cat_id: 2 },
        { to_do: 'Avengers', priority: false, user_id: 1, cat_id: 4 },
        { to_do: 'coffee', priority: false, user_id: 1, cat_id: 3 },
        { to_do: 'To Kill a Mockingbird', priority: true, user_id: 1, cat_id: 1 },
        { to_do: 'oreos', priority: false, user_id: 1, cat_id: 5 },
        { to_do: 'something_unusual', priority: true, user_id: 1, cat_id: null }
      ])
    })
};

