import { number, z } from "zod"
import { knex } from "../../../src/database"


const sessionIdExists = async (sessionId: string) => {
    const sessionIdShcema = z.object({
        sessionId: number()
    })
    const id = sessionIdShcema.parse(sessionId)
    const result = await knex('users')
        .where({
            session_id: id,
            id
        }).first()
    if (!result) {

    }
}