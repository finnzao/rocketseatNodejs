import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        owner: z.string(),
        email: z.string().email(),
        number: z.string().min(10).max(14),
        org_id: z.string().uuid()
    })

    const { name, email, number, owner, org_id } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.handler({
            name,
            number,
            email,
            owner,
            org_id
        })
    } catch (error) {
        if (error) {
            return reply.status(409).send({ message: error });
        }
        throw error;
    }
    return reply.status(201).send();
}
