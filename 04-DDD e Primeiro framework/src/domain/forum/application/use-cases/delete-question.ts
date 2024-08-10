import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'

interface DeleteQuestionUseCaseRquest {
    questionId: string
    authorId: string
}

type DeleteQuestionUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>

export class DeleteQuestionOnUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }
    async execute({
        questionId,
        authorId
    }: DeleteQuestionUseCaseRquest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId) // Return Objeto Question 

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
