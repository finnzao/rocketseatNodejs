import { expect } from 'vitest'
import { AnswerQuestionOnUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// system under test
let sut: AnswerQuestionOnUseCase
describe('Create Answer ', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionOnUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer an question', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Contente Answer',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
