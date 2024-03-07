"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const dbNames_1 = require("../../src/Utils/dbNames");
async function up(knex) {
    await knex.schema.alterTable(dbNames_1.tables.transactions, (table) => {
        table.uuid('session_id').notNullable().after('id').index();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable(dbNames_1.tables.transactions, (table) => {
        table.dropColumn('session_id');
    });
}
exports.down = down;
