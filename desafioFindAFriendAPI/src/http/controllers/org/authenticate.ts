import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        phone: z.string().email(),
        password: z.string().min(6),
    });

    const { phone: number, password } = authenticateBodySchema.parse(request.body);
    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { orgs } = await authenticateUseCase.handler({
            number,
            password,
        });
        // request.org.sub
        const token = await reply.jwtSign(
            {
                role: orgs.role,
            },
            {
                sign: {
                    sub: orgs.id,
                },
            },
        );

        const refreshToken = await reply.jwtSign(
            {
                role: orgs.role,
            },
            {
                sign: {
                    sub: orgs.id,
                    expiresIn: "5d",
                },
            },
        );

        return reply
            .setCookie("refreshToken", refreshToken, {
                path: "/",
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token,
            });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
}
