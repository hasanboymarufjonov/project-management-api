import { Knex } from 'knex';

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('tasks', (table) => {
    table
      .enum('status', ['CREATED', 'IN_PROGRESS', 'DONE'])
      .defaultTo('CREATED');

    table.timestamp('done_at').nullable();
  });
}

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('tasks', (table) => {
    table.dropColumn('status');
    table.dropColumn('done_at');
  });
}
