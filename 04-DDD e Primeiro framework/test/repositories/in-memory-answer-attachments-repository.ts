import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
<<<<<<< HEAD
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
=======
    implements AnswerAttachmentsRepository {
    public items: AnswerAttachment[] = []

    async findManyByAnswerId(answerId: string) {
        const answerAttachments = this.items.filter(
            (item) => item.answerId.toString() === answerId,
        )

        return answerAttachments
    }

    async deleteManyByAnswerId(answerId: string) {
        const answerAttachments = this.items.filter(
            (item) => item.answerId.toString() !== answerId,
        )

        this.items = answerAttachments
    }
}
>>>>>>> e298bdf7c698025df5ca4395ad50ebf7d47b97ec
