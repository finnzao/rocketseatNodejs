//npx knex migrate:make create-meal
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.string('title').notNullable()
        table.text('desc').notNullable()
        table.tinyint('on_diet').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.uuid('session_id').notNullable().index()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals')
}

