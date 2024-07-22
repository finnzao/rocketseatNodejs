import { FastifyInstance } from "fastify";
import { register } from "./register"
import { getAll } from "./getAll"
import { getProfilePet } from "./profilePet"

export async function petRoutes(app: FastifyInstance) {
    app.post("/pets", register)
    app.get("/pets", getAll)
    app.get("/profilePet", getProfilePet)
}