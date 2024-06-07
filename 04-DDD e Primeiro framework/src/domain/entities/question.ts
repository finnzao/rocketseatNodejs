import { randomUUID } from "node:crypto"

interface QuestionProps {
    title: string
    content: string
    authorId: string
}
export class Question {
    public title: string
    public content: string
    public authorId: string
    public id: string

    constructor(props: QuestionProps, id?: string) {
        this.title = props.title
        this.authorId = props.authorId
        this.content = props.content
        this.id = id ?? randomUUID()

    }
}