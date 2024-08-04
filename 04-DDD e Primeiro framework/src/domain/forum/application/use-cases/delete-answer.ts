import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepostiory } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

interface DeleteAnswerUseCaseRquest {
    questionId: string
    authorId: string
}

interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerOnUseCase {
    constructor(private questionsRepository: AnswersRepostiory) { }
    async execute({
        questionId,
        authorId
    }: DeleteAnswerUseCaseRquest): Promise<DeleteAnswerUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId) // Return Objeto Question 

        if (!question) {
            throw new Error('Answer Not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not Allowed')

        }
        await this.questionsRepository.delete(question)
        return {}
    }
}
