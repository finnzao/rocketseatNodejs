import { Answer } from "../entities/answer";

export interface AnswersRepostiory {
    create(answer: Answer): Promise<void>
}