import fastify from "fastify";
import pino from "pino";
import pretty from "pino-pretty";

export const server = fastify({
  logger: pino(pretty()),
});

server.get("/", async function handler() {
  return { msg: "root" };
});

server.get("/ping", async function handler() {
  return { msg: Date.now() };
});

server.get("/pong", async function handler() {
  return { msg: Date.now() };
});
