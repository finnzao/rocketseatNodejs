import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeGetProfileProfileUseCase } from "@/use-cases/factories/make-get-pet-profile";


const profilePetBodyShcema = z.object({
    petId: z.string()
})
export async function getProfilePet(request: FastifyRequest, response: FastifyReply) {

    const { petId } = profilePetBodyShcema.parse(request.body)
    const getProfilePet = makeGetProfileProfileUseCase();
    const { pet } = await getProfilePet.handler({
        petId
    })

    return response.status(200).send({
        pet: {
            ...pet,
        }
    })
}