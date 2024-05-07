import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchUseCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUseCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.handler({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkIns,
  });
}
