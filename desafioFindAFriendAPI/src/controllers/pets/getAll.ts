import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeRegisterUseCase } from "use-cases/factories/make-register-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {


    try {
        const getAllUserCase = getAllpets()
    } catch (error) {
        
    }


}
