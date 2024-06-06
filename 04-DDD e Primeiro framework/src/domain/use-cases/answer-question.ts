import { Answer } from "../entities/answer"

interface AnswerQuestionOnUseCaseRquest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionOnUseCase {
    execute({ instructorId, questionId, content }: AnswerQuestionOnUseCaseRquest) {
        const answer = new Answer(content)
        return answer
    }
}


