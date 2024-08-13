import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '@/core/entities/question-attachment'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'

interface CreateQuestionUseCaseRquest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]

}

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionOnUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }
  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRquest): Promise<CreateQuestionUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })
    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)
    return right({
      question,
    })
  }
}
