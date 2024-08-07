import { expect } from 'vitest'
import { CreateQuestionOnUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: CreateQuestionOnUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionOnUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an answer', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Titulo',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
