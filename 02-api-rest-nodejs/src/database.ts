import { env } from "./env";
import { knex as setupKnex, Knex } from "knex";


export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL,
    },
    migrations: {
        extension: 'ts',
        directory: './db/migration'
    },
    useNullAsDefault: true
}
export const knex = setupKnex(config)


