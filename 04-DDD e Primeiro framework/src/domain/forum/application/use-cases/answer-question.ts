import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionOnUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionOnUseCaseReponse {
  answer: Answer
}
export class AnswerQuestionOnUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionOnUseCaseRequest): Promise<AnswerQuestionOnUseCaseReponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
