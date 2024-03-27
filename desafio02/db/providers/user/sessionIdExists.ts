
import { knex } from "../../../src/database"


export async function sessionIdExists(sessionId: string | undefined) {
    const result = await knex('users')
        .where({
            session_id: sessionId,
        }).first()

    if (!result) {
        return false
    }
    return true
}


