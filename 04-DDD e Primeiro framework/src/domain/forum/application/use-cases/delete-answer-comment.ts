import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerCommentId: string
}

interface DeleteAnswerCommentUseCaseReponse { }

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerCommentUseCaseReponse> {
        const answerComment = await this.answerCommentsRepository.findById(
            answerCommentId,
        )

        if (!answerComment) {
            throw new Error('Answer comment not found')
        }

        if (answerComment.authorId.toString() !== authorId) {
            throw new Error('Not Allowed')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return {}
    }

}