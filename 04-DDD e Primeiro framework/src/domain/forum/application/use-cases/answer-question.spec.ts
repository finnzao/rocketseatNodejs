import { expect, test } from 'vitest'
import { AnswerQuestionOnUseCase } from './answer-question'
import { AnswersRepostiory } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswersRepositroy: AnswersRepostiory = {
  create: async (answer: Answer): Promise<void> => {},
}
test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionOnUseCase(fakeAnswersRepositroy)

  const answer = await answerQuestion.execute({
    content: 'Okay',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Okay')
})
