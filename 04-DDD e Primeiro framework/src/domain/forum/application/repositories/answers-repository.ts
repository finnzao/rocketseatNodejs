import { Answer } from '../../enterprise/entities/answer'
import { PaginationParams } from './pagination-params'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  delete(answer: Answer): Promise<void>
  save(question: Answer): Promise<void>
}
