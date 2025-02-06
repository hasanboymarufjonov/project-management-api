import { Knex } from 'knex';

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
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
    table.enu('status', ['CREATED', 'IN_PROCESS', 'DONE']).defaultTo('CREATED');
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
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('tasks');
};
