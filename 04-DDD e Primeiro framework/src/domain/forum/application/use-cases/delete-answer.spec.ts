import { expect } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryAnswerRepository: InMemoryAnswersRepository
// system under test
let sut: DeleteAnswerUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeAnswer()
    inMemoryAnswerRepository.create(newQuestion)

    await sut.execute({
      answerId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString()
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryAnswerRepository.create(newQuestion)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)

  })



})
