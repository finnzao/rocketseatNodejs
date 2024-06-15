import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepostiory } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/question-repostiry'
import { Question } from '../../enterprise/entities/question'


interface CreateQuestionUseCaseRquest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class createQuestionOnUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }
    async execute({
        authorId,
        title,
        content
    }: CreateQuestionUseCaseRquest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content
        })

        await this.questionsRepository.create(question)
        return {
            question
        }
    }
}
