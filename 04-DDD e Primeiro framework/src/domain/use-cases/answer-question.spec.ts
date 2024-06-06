import { expect, test } from "vitest"
import { AnswerQuestionOnUseCase } from "./answer-question"

test('create an answer', () => {
    const answerQuestion = new AnswerQuestionOnUseCase()

    const answer = answerQuestion.execute({
        content: 'Okay',
        instructorId: '1',
        questionId: '1'
    })


    expect(answer.content).toEqual('Okay')
})