import { Question } from '../../enterprise/entities/question'
import { AnswersRepostiory } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/question-repository'

interface ChosseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChosseQuestionBestAnswerUseCaseResponse {
  question: Question
}
export class ChosseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepostiory,
  ) { }

  async execute({
    authorId,
    answerId,
  }: ChosseQuestionBestAnswerUseCaseRequest): Promise<ChosseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Question not found.')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)
    return {
      question,
    }
  }
}