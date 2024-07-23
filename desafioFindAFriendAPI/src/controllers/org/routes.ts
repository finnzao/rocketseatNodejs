import { FastifyInstance } from "fastify";
import { register } from "./register"

export async function petRoutes(app: FastifyInstance) {
    app.post("/register", register)
}