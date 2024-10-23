import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
<<<<<<< HEAD
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
=======
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
    deleteManyByAnswerId(answerId: string): Promise<void>
}
>>>>>>> e298bdf7c698025df5ca4395ad50ebf7d47b97ec
