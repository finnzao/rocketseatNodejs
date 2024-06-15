import { Slug } from './slug'

test('It should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example QuestION TITLE')

  expect(slug.value).toEqual('example-question-title')
})
