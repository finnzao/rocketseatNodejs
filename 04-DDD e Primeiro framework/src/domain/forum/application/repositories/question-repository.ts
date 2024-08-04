import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  save(question: Question): Promise<void>
  delete(answer: Question): Promise<void>
}
