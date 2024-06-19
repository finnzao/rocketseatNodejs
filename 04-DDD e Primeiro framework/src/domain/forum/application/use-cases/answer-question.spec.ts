import { expect } from 'vitest'
import { AnswerQuestionOnUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositores/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswerRepository
// system under test
let sut: AnswerQuestionOnUseCase
describe('Create Answer ', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionOnUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer an question', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Contente Answer',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
