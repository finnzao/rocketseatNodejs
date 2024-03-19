import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import checkSessionIdExists from "../middlewares/check-session-id-exists"
import { timeZone } from "../Utils/timeZoneBrazil"


async function mealsRoutes(app: FastifyInstance) {


    //GET
    app.get(
        '/',
        {
            preHandler: [checkSessionIdExists]
        },
        async (req, res) => {
            const { sessionId } = req.cookies
            const meals = await knex('meals')
                .where('session_id', sessionId)
                .select()

            return {
                meals
            }
        })

    app.get(
        'nameMeal/:title',
        {
            preHandler: [checkSessionIdExists]
        }
        ,
        async (req) => {
            const getMealParamsSchema = z.object({
                title: z.string()

            })
            const { sessionId } = req.cookies
            const { title } = getMealParamsSchema.parse(req.params)
            const meals = await knex('meals')
                .where({
                    session_id: sessionId,
                    title
                }).first()


            return { meals }
        })
    // GET BY USER ID
    app.get('/:id',
        {
            preHandler: [checkSessionIdExists]
        }
        ,
        async (req) => {
            const getMealParamsSchema = z.object({
                id: z.string().uuid()

            })
            const { sessionId } = req.cookies
            const { id } = getMealParamsSchema.parse(req.params)
            const meals = await knex('meals')
                .where({
                    session_id: sessionId,
                    id
                }).first()


            return { meals }
        })

    //CREATE
    app.post('/',
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
                title: z.string(),
                desc: z.string(),
                on_diet: z.boolean()
            })

            const { title, desc, on_diet } = createMealBodySchema.parse(req.body)

            await knex('meals')
                .insert({
                    id: randomUUID(),
                    title,
                    desc,
                    on_diet,
                    session_id: sessionId,
                    created_at: date
                })

            res.status(201).send()

        })
    // DELETE


    //SUMMARY
    app.get(
        '/summary',
        {
            preHandler: [checkSessionIdExists]
        },
        async (req) => {
            let sessionId = req.cookies.sessionId
            const summary = await knex('meals')
                .where('session_id', sessionId)
                .sum('amount', { as: 'amount' })
                .first()

            return { summary }
        })


}


export {
    mealsRoutes
}