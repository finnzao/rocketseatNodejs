import { QuestionsRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse { }


export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository)

    async execute({
        authorId,
        questionId,
        content,
        title
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

    }
}