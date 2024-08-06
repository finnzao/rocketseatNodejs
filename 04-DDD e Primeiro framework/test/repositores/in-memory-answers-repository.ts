import { AnswersRepostiory } from "@/domain/forum/application/repositories/answers-repository";
import { PaginationParams } from "@/domain/forum/application/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRepostiory {
    public items: Answer[] = []

    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id)

        if (!answer) {
            return null
        }

        return answer
    }

    async create(answer: Answer) {
        this.items.push(answer)
    }

    async delete(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        this.items.splice(itemIndex, 1)
    }

    async save(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)
        this.items[itemIndex] = answer
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
        const answers = this.items
          .filter((item) => item.questionId.toString() === questionId)
          .slice((page - 1) * 20, page * 20)
    
        return answers
      }
    
}