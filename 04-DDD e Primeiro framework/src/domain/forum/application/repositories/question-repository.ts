import { Question } from '../../enterprise/entities/question'
import { PaginationParams } from './pagination-params'
export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findBySlug(slug: string): Promise<Question | null>
  save(question: Question): Promise<void>
  delete(answer: Question): Promise<void>
}
