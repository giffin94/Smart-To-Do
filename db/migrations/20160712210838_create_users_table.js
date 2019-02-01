
exports.up = function(knex, Promise) {
  return Promise.all([
   knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('categories', (table) => {
      table.increments();
      table.string('category');
    }),
    knex.schema.createTable('to_dos', (table) => {
      table.increments();
      table.string('to_do');
      table.bool('priority');
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('cat_id').references('categories.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('to_dos'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('categories')
  ]);
};
