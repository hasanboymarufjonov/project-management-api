import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    if (!knex.schema.hasColumn('users', 'role')) {
      table
        .enum('role', ['admin', 'head', 'employee'])
        .defaultTo('employee')
        .notNullable();
    }
  });

  await knex.schema.alterTable('users', (table) => {
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
    table.dropTimestamps();
  });
}
