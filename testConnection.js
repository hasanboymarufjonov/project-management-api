// const knex = require('./knexfile');

// knex
//   .raw('SELECT 1+1 AS result')
//   .then((result) => {
//     console.log('Connection Successful:', result.rows);
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// knex('users')
//   .select('*')
//   .then((rows) => {
//     console.log('User table data:', rows);
//   })
//   .catch((err) => {
//     console.error('Error fetching data:', err);
//   })
//   .finally(() => knex.destroy());
