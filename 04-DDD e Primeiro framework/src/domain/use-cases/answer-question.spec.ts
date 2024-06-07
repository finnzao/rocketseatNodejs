import { expect, test } from "vitest"
import { AnswerQuestionOnUseCase } from "./answer-question"
import { AnswersRepostiory } from "../repositories/answers-repository"
import { Answer } from "../entities/answer"


const fakeAnswersRepositroy: AnswersRepostiory = {
    create: async (answer: Answer): Promise<void> => {
        return;
    }
}
test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionOnUseCase(fakeAnswersRepositroy)

    const answer = await answerQuestion.execute({
        content: 'Okay',
        instructorId: '1',
        questionId: '1'
    })


    expect(answer.content).toEqual('Okay')
})