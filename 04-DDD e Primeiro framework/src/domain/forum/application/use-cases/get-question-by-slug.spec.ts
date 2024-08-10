import { expect } from 'vitest'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: GetQuestionBySlugUseCase
describe('Get Question By slung', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create("example-slug")
        })
        inMemoryQuestionsRepository.create(newQuestion)
        const result = await sut.execute({
            slug: "example-slug"
        })
        expect(result.value?.question.id).toBeTruthy()
        expect(result.value?.question.title).toEqual(newQuestion.title)
    })
})
