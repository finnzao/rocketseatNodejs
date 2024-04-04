import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrimaUsersRepository } from "@/repositores/prisma/prisma-users-repositore";
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const prismaUsersRepository = new PrimaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    await registerUseCase.handler({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof Error)
    return reply.status(409).send();
  }
  return reply.status(201).send();
}
