import { QuestionComment } from '../../enterprise/entities/question-comment'
import { PaginationParams } from './pagination-params'

export interface QuestionCommentsRepository {
    create(questionComment: QuestionComment): Promise<void>
    findById(id: string): Promise<QuestionComment | null>
    findManyByQuestionId(
        questionId: string,
        params: PaginationParams,
    ): Promise<QuestionComment[]>
    delete(questionComment: QuestionComment): Promise<void>
}