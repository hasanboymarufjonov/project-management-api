/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.date('due_date');
    table
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE');
    table
      .integer('assigned_to')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .enum('status', ['CREATED', 'IN_PROCESS', 'DONE'])
      .defaultTo('CREATED');
    table.timestamp('done_at');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
