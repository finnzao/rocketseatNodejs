import { FastifyInstance } from "fastify";
import { register } from "./register"


export async function petRoutes(app: FastifyInstance) {
    app.post("/pets", register)
    app.get("/pets",)
}