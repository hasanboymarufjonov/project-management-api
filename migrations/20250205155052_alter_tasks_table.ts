import { Knex } from 'knex';

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('tasks', (table) => {
    table.dropColumn('worker_user_id');
    table.renameColumn('assigned_to', 'worker_user_id');
    table
      .integer('worker_user_id')
      .unsigned()
      .references('id')
      .inTable('organization_users')
      .onDelete('SET NULL');
    table
      .integer('created_by')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('worker_user_id', 'assigned_to');
    table
      .integer('assigned_to')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.dropColumn('created_by');
  });
};
