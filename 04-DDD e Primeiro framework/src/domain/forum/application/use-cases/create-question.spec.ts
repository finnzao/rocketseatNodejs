import { expect, test } from 'vitest'
import { Question } from '../../enterprise/entities/question'
import { createQuestionOnUseCase } from './create-question'
import { QuestionsRepository } from '../repositories/question-repostiry'

const fakeQuestionRepositroy: QuestionsRepository = {
  create: async (question: Question): Promise<void> => { },
}
test('create an answer', async () => {
  const createQuestion = new createQuestionOnUseCase(fakeQuestionRepositroy)

  const { question } = await createQuestion.execute({
    authorId: "1",
    content: "Nova pergunta",
    title: "Titulo"
  })

  expect(question.id).toBeTruthy()
})
