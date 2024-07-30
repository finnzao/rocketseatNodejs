import { expect } from 'vitest'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositores/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: GetQuestionBySlugUseCase
describe('Get Question By slung', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by slug', async () => {
        const newQuestion = Question.create({
            title: "Example question",
            slug: Slug.create("example-slug"),
            authorId: new UniqueEntityID(),
            content: "Example content"
        })
        inMemoryQuestionsRepository.create(newQuestion)
        const { question } = await sut.execute({
            slug: "example-slug"
        })

        expect(question.id).toBeTruthy()
    })
})
