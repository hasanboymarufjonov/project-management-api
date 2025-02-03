const knex = require('./knexfile');

knex
  .raw('SELECT 1+1 AS result')
  .then((result) => {
    console.log('Connection Successful:', result.rows);
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  })
  .finally(() => {
    knex.destroy();
  });
