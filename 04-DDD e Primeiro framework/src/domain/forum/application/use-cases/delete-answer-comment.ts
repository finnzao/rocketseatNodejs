import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

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
            return left(new ResourceNotFoundError)
        }

        if (answerComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError)
        }

        await this.answerCommentsRepository.delete(answerComment)

        return right({})

    }

}