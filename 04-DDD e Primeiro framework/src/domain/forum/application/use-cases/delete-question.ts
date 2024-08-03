import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/question-repostiry'
import { Question } from '../../enterprise/entities/question'

interface DeleteQuestionUseCaseRquest {
    questionId: string
    authorId: string
}

interface DeleteQuestionUseCaseResponse { }

export class DeleteQuestionOnUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }
    async execute({
        questionId,
        authorId
    }: DeleteQuestionUseCaseRquest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId) // Return Objeto Question 

        if (!question) {
            throw new Error('Question Not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not Allowed')

        }
        await this.questionsRepository.delete(question)
        return {}
    }
}
