import { test, beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'child_process'


describe('Transcations routes', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('should be able to create a new transcation', async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transcation',
                amount: 5000,
                type: 'credit',
            })
            .expect(201)

    })

    it('should be able to list all transactions', async () => {


        const transactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transcation',
                amount: 5000,
                type: 'credit',
            })
            .expect(201)
        const cookies = transactionResponse.get('Set-Cookie')

        const transactionBody = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)


        expect(transactionBody.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transcation',
                amount: 5000,
            })
        ])
    })

    it('should be able to get specific transactions', async () => {


        const transactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transcation',
                amount: 5000,
                type: 'credit',
            })
            .expect(201)
        const cookies = transactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        const transactionId = listTransactionsResponse.body.transactions[0].id
        console.log(transactionId)

        const specificTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)




        console.log(specificTransactionResponse)
        expect(specificTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New transcation',
                amount: 5000,
            })
        )
    })

    it('should be able to get summary', async () => {


        const transactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transcation',
                amount: 5000,
                type: 'credit',
            })
            .expect(201)
        const cookies = transactionResponse.get('Set-Cookie')

        await request(app.server)
            .post('/transactions')
            .send({
                title: 'Debit transcation',
                amount: 2000,
                type: 'debit',
            })

        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)


        expect(summaryResponse.body.summary).toEqual({
            amount: 5000
        })
    })
})
