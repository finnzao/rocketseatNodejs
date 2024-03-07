import type { Knex } from "knex";
import { tables } from "../../src/Utils/dbNames";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.alterTable(tables.transactions, (table) => {
        table.uuid('session_id').notNullable().after('id').index()
    })

}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.alterTable(tables.transactions, (table) => {
        table.dropColumn('session_id')
    })
}

