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
        {
            preHandler: [checkSessionIdExists]
        },
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
            const mealBodySchema = z.object({
                title: z.string(),
                desc: z.string(),
                on_diet: z.number()
            })

            const { title, desc, on_diet } = mealBodySchema.parse(req.body)

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
    app.delete('/delete/:id',
        {
            preHandler: [checkSessionIdExists]
        },
        async (req) => {
            const getMealParamsSchema = z.object({
                id: z.string().uuid()

            })
            const { id } = getMealParamsSchema.parse(req.params)
            const deleteMeal = await knex('meals')
                .where('id', id)
                .delete()
                .first()
        })

    //SUMMARY
    app.get(
        '/summary',
        {
            preHandler: [checkSessionIdExists]
        },
        async (req) => {
            let sessionId = req.cookies.sessionId
            const summaryOnDiet: string | number = await knex('meals')
            .where('session_id', 123)
            .where('on_diet', 1).count({ quantity: 'on_diet' })
            const summaryAllMeals: string | number = await knex('meals')
                .where('session_id', 123)
                .count({ quantity: 'on_diet' })
            const summaryNotOnDiet: string | number = await knex('meals')
                .where('session_id', 123)
                .where('on_diet', 0)
                .count({ quantity: 'on_diet' })
            return { summaryNotOnDiet }
        })
    //UPDATE
    app.post(
        '/update/:id'
        ,
        {
            preHandler: [checkSessionIdExists]
        },
        async (req, res) => {

            try {
                const mealBodySchema = z.object({
                    title: z.string(),
                    desc: z.string(),
                    on_diet: z.number()
                })
                const getMealParamsSchema = z.object({
                    id: z.string().uuid()

                })
                const { sessionId } = req.cookies
                const { id } = getMealParamsSchema.parse(req.params)
                const { title, desc, on_diet } = mealBodySchema.parse(req.body)


                await knex('meals')
                    .where('id', id)
                    .update({
                        title,
                        desc,
                        on_diet
                    })

                res.status(204).send()
            } catch (error) {
                res.status(400).send(error)
            }

        }
    )

}


export {
    mealsRoutes
}