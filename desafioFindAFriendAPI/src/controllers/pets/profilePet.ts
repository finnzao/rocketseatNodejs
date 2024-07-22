import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeGetProfileProfileUseCase } from "@/use-cases/factories/make-get-pet-profile";



export async function getProfilePet(request: FastifyRequest, response: FastifyReply) {
    const 

    const getProfilePet = makeGetProfileProfileUseCase();
    const { pet } = await getProfilePet.handler({

    })
}