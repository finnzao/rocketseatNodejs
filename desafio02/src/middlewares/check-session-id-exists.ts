import { FastifyReply, FastifyRequest } from "fastify"
import { sessionIdExists } from "../../db/providers/user/sessionIdExists"

export default async function checkSessionIdExists(
    req: FastifyRequest,
    res: FastifyReply
) {

    const id = req.cookies.sessionId
    const sessionId = await sessionIdExists(id)

    if (!sessionId) {
        return res.status(401).send({
            error: 'Unauthorized'
        })

    }
}
