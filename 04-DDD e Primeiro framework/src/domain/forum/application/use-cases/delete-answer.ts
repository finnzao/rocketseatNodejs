import { AnswersRepository } from '../repositories/answers-repository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'


interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
    constructor(private questionsRepository: AnswersRepository) { }
    async execute({
        answerId,
        authorId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const question = await this.questionsRepository.findById(answerId) // Return Objeto Question 

        if (!question) {
            return left(new ResourceNotFoundError)
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError)

        }
        await this.questionsRepository.delete(question)
        return right({})
    }
}
