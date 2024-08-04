import { expect } from 'vitest'
import { DeleteAnswerOnUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositores/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswersRepository
// system under test
let sut: DeleteAnswerOnUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerOnUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeAnswer()
    inMemoryAnswerRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
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

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })



})
