import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
<<<<<<< HEAD
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
=======
    compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
        return a.attachmentId === b.attachmentId
    }
}
>>>>>>> e298bdf7c698025df5ca4395ad50ebf7d47b97ec
