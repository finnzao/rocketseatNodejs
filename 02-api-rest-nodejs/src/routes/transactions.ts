import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import checkSessionIdExists from "../middlewares/check-session-id-exists"


async function transactionsRoutes(app: FastifyInstance) {

    app.addHook('preHandler', async (req, res) => {

    })

    //GET´S LIST

    app.get(
        '/',
        {
            preHandler: [checkSessionIdExists]
        }
        ,
        async (req, res) => {
            const { sessionId } = req.cookies
            const transactions = await knex('transactions')
                .where('session_id', sessionId)
                .select()

            return {
                transactions,
            }
        })

    app.get('/:id',
        {
            preHandler: [checkSessionIdExists]
        }
        ,
        async (req) => {
            const getTranscationParamsSchema = z.object({
                id: z.string().uuid()

            })
            const { sessionId } = req.cookies
            const { id } = getTranscationParamsSchema.parse(req.params)
            const transaction = await knex('transactions')
                .where({
                    session_id: sessionId,
                    id
                }).first()


            return { transaction }
        })

    //CREATE
    app.post('/',
        async (req, res) => {

            let sessionId = req.cookies.sessionId
            if (!sessionId) {
                sessionId = randomUUID()
                res.cookie('sessionId', sessionId, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7, // 7 days
                })
            }
            const createTranscationBodySchema = z.object({
                title: z.string(),
                amount: z.number(),
                type: z.enum(['credit', 'debit'])

            })

            const { title, amount, type } = createTranscationBodySchema.parse(req.body)

            await knex('transactions')
                .insert({
                    id: randomUUID(),
                    title,
                    amount: type === 'credit' ? amount : amount * -1,
                    session_id: sessionId
                })

            res.status(201).send()
        })
    //SUMMARY
    app.get(
        '/summary',
        {
            preHandler: [checkSessionIdExists]
        },
        async (req) => {
            let sessionId = req.cookies.sessionId
            const summary = await knex('transactions')
                .where('session_id', sessionId)
                .sum('amount', { as: 'amount' })
                .first()

            return { summary }
        })

}


export {
    transactionsRoutes
}