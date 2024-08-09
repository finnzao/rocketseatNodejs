import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { Either, left, right } from '@/core/either'


interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answerComment = await this.answerCommentsRepository.findById(
            answerCommentId,
        )

        if (!answerComment) {
            return left('Answer comment not found.')
        }

        if (answerComment.authorId.toString() !== authorId) {
            return left('Not allowed')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return right({})

    }

}