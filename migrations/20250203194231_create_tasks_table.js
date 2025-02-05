/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table
      .integer('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE');
    table
      .integer('worker_user_id')
      .unsigned()
      .references('id')
      .inTable('organization_users')
      .onDelete('SET NULL');
    table
      .enum('status', ['CREATED', 'IN_PROCESS', 'DONE'])
      .defaultTo('CREATED');
    table.timestamp('due_date').nullable();
    table.timestamp('done_at').nullable();
    table
      .integer('created_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
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
