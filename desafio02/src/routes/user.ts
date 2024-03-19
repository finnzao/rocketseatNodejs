import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import checkSessionIdExists from "../middlewares/check-session-id-exists"
import { timeZone } from "../Utils/timeZoneBrazil"
import { PasswordCrypto } from "../middlewares/PasswordCrypto"


async function userRoutes(app: FastifyInstance) {

    //CREATE
    app.post('/register',
        async (req, res) => {

            const date = timeZone()
            let sessionId = req.cookies.sessionId
            // if (!sessionId) {
            //     sessionId = randomUUID()
            //     res.cookie('sessionId', sessionId, {
            //         path: '/',
            //         maxAge: 60 * 60 * 24 * 7, // 7 days
            //     })
            // }
            const createMealBodySchema = z.object({
                username: z.string(),
                email: z.string(),
                password: z.string(),
                admin: z.boolean().default(false)
            })

            const { username, email, password } = createMealBodySchema.parse(req.body)
            const hashedPassword = await PasswordCrypto.hashPassword(password)

            await knex('user')
                .insert({
                    id: randomUUID(),
                    username,
                    email,
                    hashedPassword,
                    session_id: sessionId,
                    created_at: date
                })

            res.status(201).send()

        })
    //LOGIN
    app.post('/login',
        async (req, res) => {
            const loginSchema = z.object({
                username: z.string(),
                password: z.string()
            })

            const { username, password } = loginSchema.parse(req.body)
            const usernameExist = await knex('user').select('*').where('username', '=', username).first();
            
            await knex('user')
                .where('username', username)
                .first()

        }
    )
}
export {
    userRoutes 
}