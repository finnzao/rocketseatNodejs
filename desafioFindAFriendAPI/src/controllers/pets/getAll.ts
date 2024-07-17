import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import {  } from "use-cases/factories/make-get-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {


    try {
        const getAllUserCase = getAllpets()
    } catch (error) {
        
    }


}
