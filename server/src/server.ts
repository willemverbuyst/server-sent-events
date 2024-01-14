import cors from "@fastify/cors";
import fastify from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import pino from "pino";
import pretty from "pino-pretty";

export const server = fastify({
  logger: pino(pretty()),
});

await server.register(cors, { origin: "*", methods: ["GET", "POST"] });

let clients: { id: string; response: ServerResponse<IncomingMessage> }[] = [];

server.get("/sse", async (request, reply) => {
  const res = reply.raw;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.write("data: server connected!\n\n");

  const clientId = request.id;
  const newClient = {
    id: clientId,
    response: res,
  };
  clients.push(newClient);

  const intervalId = setInterval(() => {
    res.write(
      `data: ${["Ping", "Pong"][Math.floor(Math.random() * 2)]} ${Date.now()}\n\n`,
    );
  }, 3000);

  request.raw.on("close", () => {
    console.log(`${clientId} connection closed`);
    clearInterval(intervalId);
    clients = clients.filter((client) => client.id !== clientId);
  });
});

server.get("/", async function handler(req, reply) {
  return { msg: "server was called on root" };
});
