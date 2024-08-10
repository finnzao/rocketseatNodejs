import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

interface CreateQuestionUseCaseRquest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionOnUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRquest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)
    return right({
      question,
    })
  }
}
