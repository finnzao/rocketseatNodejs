//npx knex migrate:make create-user
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.text('username')
        table.text('password')
        table.boolean('admin').defaultTo(false)
        table.text('email').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.uuid('session_id').notNullable().index()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

