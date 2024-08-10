import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/question-repository'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

interface ChosseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChosseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question: Question
}>
export class ChosseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) { }

  async execute({
    authorId,
    answerId,
  }: ChosseQuestionBestAnswerUseCaseRequest): Promise<ChosseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError)
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)
    return right({
      question,
    })
  }
}