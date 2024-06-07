import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
    title: string
    content: string
    authorId: string
    slug: Slug
}
export class Question {
    public title: string
    public content: string
    public slug: Slug
    public authorId: string
    public id: string

    constructor(props: QuestionProps, id?: string) {
        this.title = props.title
        this.authorId = props.authorId
        this.content = props.content
        this.slug = props.slug
        this.id = id ?? randomUUID()
    }
}