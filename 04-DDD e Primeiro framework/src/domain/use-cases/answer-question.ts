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
        const answer = new Answer({ authorId: instructorId, questionId, content })

        await this.answersRepository.create(answer)

        return answer
    }

}


