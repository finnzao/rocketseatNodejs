import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswersRepostiory } from "../repositories/answers-repository"
interface AnswerQuestionOnUseCaseRquest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionOnUseCase {
    constructor(
        private answersRepository: AnswersRepostiory,
    ) { }
    async execute({ instructorId, questionId, content }: AnswerQuestionOnUseCaseRquest) {
        const answer =  Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        await this.answersRepository.create(answer)

        return answer
    }

}


