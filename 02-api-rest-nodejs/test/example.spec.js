"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const app_1 = require("../src/app");
const supertest_1 = __importDefault(require("supertest"));
const child_process_1 = require("child_process");
(0, vitest_1.describe)('Transcations routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.beforeEach)(() => {
        (0, child_process_1.execSync)('npm run knex migrate:rollback --all');
        (0, child_process_1.execSync)('npm run knex migrate:latest');
    });
    (0, vitest_1.it)('should be able to create a new transcation', async () => {
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transcation',
            amount: 5000,
            type: 'credit',
        })
            .expect(201);
    });
    (0, vitest_1.it)('should be able to list all transactions', async () => {
        const transactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transcation',
            amount: 5000,
            type: 'credit',
        })
            .expect(201);
        const cookies = transactionResponse.get('Set-Cookie');
        const transactionBody = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(transactionBody.body.transactions).toEqual([
            vitest_1.expect.objectContaining({
                title: 'New transcation',
                amount: 5000,
            })
        ]);
    });
    (0, vitest_1.it)('should be able to get specific transactions', async () => {
        const transactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transcation',
            amount: 5000,
            type: 'credit',
        })
            .expect(201);
        const cookies = transactionResponse.get('Set-Cookie');
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        const transactionId = listTransactionsResponse.body.transactions[0].id;
        console.log(transactionId);
        const specificTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200);
        console.log(specificTransactionResponse);
        (0, vitest_1.expect)(specificTransactionResponse.body.transaction).toEqual(vitest_1.expect.objectContaining({
            title: 'New transcation',
            amount: 5000,
        }));
    });
    (0, vitest_1.it)('should be able to get summary', async () => {
        const transactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transcation',
            amount: 5000,
            type: 'credit',
        })
            .expect(201);
        const cookies = transactionResponse.get('Set-Cookie');
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'Debit transcation',
            amount: 2000,
            type: 'debit',
        });
        const summaryResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(summaryResponse.body.summary).toEqual({
            amount: 5000
        });
    });
});
