import { ChosseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChosseQuestionBestAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new ChosseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    )

  })

  it('should be able to chose the best answer and question', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString()
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toMatchObject(answer.id)
  })

  it('should not be able to chose the best answer and question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)


  })
})