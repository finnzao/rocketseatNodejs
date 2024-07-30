import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(answer: Question): Promise<void>
  findBySlug(slug: String): Promise<Question  | null>
}
