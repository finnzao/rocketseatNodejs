import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { env } from "./env";

import { petRoutes } from "./http/controllers/pets/routes";

export const app = fastify()


app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);

// ROUTE´s
app.register(petRoutes)
app.register


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation Error.", issues: error.format() });
    }
  
    if (env.NODE_ENV !== "production") {
      console.error(error);
    } else {
      // TODO hEre we should log to an external tool like DataDog/NewRelic/Sentry
    }
  
    return reply.status(500).send({ message: "Internal server error." });
  });
  export default app;