import cors from "@fastify/cors";
import fastify, { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import pino from "pino";
import pretty from "pino-pretty";

export const server = fastify({
  logger: pino(pretty()),
});

const corsOptions = {
  origin: "*",
  // methods: "OPTION,GET,HEAD,PUT,PATCH,DELTE",
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  // exposedHeaders: "Authorization",
};

await server.register(cors, { origin: "*", methods: "GET" });

let clients: { id: string; response: FastifyReply }[] = [];

function listenEvent() {
  const interval = setInterval(() => {
    clients.forEach((client) => {
      client.response.raw.write(JSON.stringify({ txt: new Date() }));
    });

    if (clients.length === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

function eventsHandler(req: FastifyRequest, reply: FastifyReply) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-control": "no-cache",
    // "Access-Control-Allow-Origin": "*",
  };

  reply.raw.writeHead(200, headers);
  reply.raw.write(JSON.stringify({ txt: new Date() }));

  const clientId = req.id;

  const newClient = {
    id: clientId,
    response: reply,
  };

  clients.push(newClient);

  listenEvent();

  req.raw.on("close", () => {
    console.log(`${clientId} connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

server.get("/sse", eventsHandler);

server.get("/", async function handler() {
  return { msg: "server was called on root" };
});
