import { fastify, FastifyInstance } from "fastify";

/**
 * Importing routes
 */

import notesRoutes from "./routes/notes.routes";

/**
 * Creating a server instance
 */

const app: FastifyInstance = fastify();

/**
 * Registering routes
 */

// Home route

app.get("/", () => {
  return {
    message:
      "Welcome to NoteX API! You can access the documentation at https://notex.live/docs",
  };
});

// Other routes

app.register(notesRoutes, {
  prefix: "/notes",
});

/**
 * Starting the server
 */

const PORT = 3333;
const HOST = "0.0.0.0";

app.listen(
  {
    port: PORT,
    host: HOST,
  },
  () => {
    console.log(`⚡️ [Server]: NoteX API is running at port ${HOST}:${PORT}`);
  },
);
