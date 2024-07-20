import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeGetAllPetsUseCase } from "use-cases/factories/make-get-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const getAllQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = getAllQuerySchema.parse(request.query);
    const getAllUserCase = makeGetAllPetsUseCase();

    const { pets } = await getAllUserCase.handler({
        page
    })

    return reply.status(200).send({
        pets
    })

}
