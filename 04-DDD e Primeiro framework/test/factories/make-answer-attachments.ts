import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import {
<<<<<<< HEAD
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
=======
    AnswerAttachment,
    AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueEntityID,
) {
    const answerAttachment = AnswerAttachment.create(
        {
            answerId: new UniqueEntityID(),
            attachmentId: new UniqueEntityID(),
            ...override,
        },
        id,
    )

    return answerAttachment
}
>>>>>>> e298bdf7c698025df5ca4395ad50ebf7d47b97ec
