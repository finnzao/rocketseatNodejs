import { FastifyInstance } from "fastify";
import { register } from "./register"
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function petRoutes(app: FastifyInstance) {
    app.post("/register", register)
    app.post("/login", authenticate)
    app.patch("/token/refresh", refresh);

}