import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";


import { petRoutes } from "./controllers/pets/routes";

export const app = fastify()


app.register(petRoutes)