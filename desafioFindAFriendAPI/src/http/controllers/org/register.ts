import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        number: z.string().min(10).max(14),
        owner: z.string().min(3),
        org_id: z.string().min(1)
    })
    const { name, email, number, owner, org_id } = registerBodySchema.parse(request.body)


    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.handler({
            name,
            email,
            number,
            owner,
            org_id
        })
    } catch (error) {
        if (error) {
            return reply.status(409).send({ message: error });
        }
        throw error; // TODO fix me
    }
    return reply.status(201).send();
}
