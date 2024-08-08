import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRquest {
    questionId: string
    authorId: string
}

interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerOnUseCase {
    constructor(private questionsRepository: AnswersRepository) { }
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
