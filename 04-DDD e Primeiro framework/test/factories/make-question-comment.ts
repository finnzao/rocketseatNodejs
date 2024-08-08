import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
    QuestionComment,
    QuestionCommentProps
} from "@/domain/forum/enterprise/entities/question-comment"


export function makeQuestionAnswer(
    override: Partial<QuestionComment> = {},
    id?: UniqueEntityID
) {
    const question = QuestionComment.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override
    },
        id)
}