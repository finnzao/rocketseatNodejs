import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentProps {
<<<<<<< HEAD
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}
=======
    answerId: UniqueEntityID
    attachmentId: UniqueEntityID
}
export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
    get answerId() {
        return this.props.answerId
    }
    get attachmentId() {
        return this.props.attachmentId
    }
    static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
        const answerAttachment = new AnswerAttachment(props, id)
        return answerAttachment
    }
}
>>>>>>> e298bdf7c698025df5ca4395ad50ebf7d47b97ec
