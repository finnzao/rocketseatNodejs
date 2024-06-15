import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepostiory {
  create(answer: Answer): Promise<void>
}
