import cors from "@fastify/cors";
import fastify from "fastify";
import pino from "pino";
import pretty from "pino-pretty";

export const server = fastify({
  logger: pino(pretty()),
});

const corsOptions = {
  origin: "*",
  methods: "OPTION,GET,HEAD,PUT,PATCH,DELTE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposeHeaders: "Authorization",
};

server.register(cors, corsOptions);

server.get("/", async function handler() {
  return { msg: "server was called on root" };
});
