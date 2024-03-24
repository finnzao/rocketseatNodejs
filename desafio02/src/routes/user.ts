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

            try {
                const date = timeZone()

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
                    admin: z.number().default(0)
                })

                const { username, email, password } = createMealBodySchema.parse(req.body)
                const hashedPassword = await PasswordCrypto.hashPassword(password)

                const userCreate = await knex('users')
                    .insert({
                        id: randomUUID(),
                        username,
                        email,
                        password: hashedPassword,
                        session_id: randomUUID(),
                        created_at: date
                    })
                res.status(201).send()
            } catch (error) {
                res.status(400).send(error)
            }


        })
    //LOGIN
    app.post('/login',
        async (req, res) => {
            const loginSchema = z.object({
                username: z.string(),
                password: z.string()
            })

            const { username, password } = loginSchema.parse(req.body)
            const usernameExist = await knex('users').select('*').where('username', '=', username).first();

            const userDate = await knex('users').where('username', username).first()
            if (!userDate) {
                return res.status(400).send({
                    errors: {
                        default: 'Email invalido'
                    }
                })
            }
            const passwordMatch = await PasswordCrypto.verifyPassword(password, userDate.password)
            if (!passwordMatch) {
                return res.status(400).send({
                    errors: {
                        default: 'Senha invalida'
                    }
                })
            }

            res.cookie('sessionId', userDate.sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
            res.status(201).send(userDate)
        }
    )
}
export {
    userRoutes
}