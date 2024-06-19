import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        breed: z.string(),
        email: z.string().email(),
        phone: z.string().min(10).max(14)
    })

    const { name, breed, email, phone } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase();
        await register.handler({
            name,
            breed,
            email,
            phone
        })
    } catch (error) {
        if (error) {
            return reply.status(409).send({ message: error });
        }
        throw error; // TODO fix me
    }
    return reply.status(201).send();
}
}