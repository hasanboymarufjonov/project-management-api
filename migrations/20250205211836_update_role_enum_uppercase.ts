import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table
      .enum('new_role', ['ADMIN', 'HEAD', 'EMPLOYEE'])
      .defaultTo('EMPLOYEE')
      .nullable();
  });

  await knex('users').update({
    new_role: knex.raw(`UPPER("role")`),
  });

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
    table.renameColumn('new_role', 'role');
  });

  await knex.raw(`
    ALTER TABLE "users" 
    ALTER COLUMN "role" SET NOT NULL,
    ADD CONSTRAINT role_check CHECK ("role" IN ('ADMIN', 'HEAD', 'EMPLOYEE'));
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE "users" DROP CONSTRAINT role_check`);
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
  });

  await knex.schema.alterTable('users', (table) => {
    table.enum('role', ['admin', 'head', 'employee']).notNullable();
  });
}
