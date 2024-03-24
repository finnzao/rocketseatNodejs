//npx knex migrate:make create-user
// npx knex migrate:latest
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.text('username').notNullable()
        table.text('password').notNullable()
        table.tinyint('admin').defaultTo(0)
        table.text('email').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.uuid('session_id').notNullable().index()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

