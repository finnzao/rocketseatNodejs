"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const dbNames_1 = require("../../src/Utils/dbNames");
async function up(knex) {
    await knex.schema.createTable(dbNames_1.tables.transactions, (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable(dbNames_1.tables.transactions);
}
exports.down = down;
