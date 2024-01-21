import { FastifyInstance } from "fastify";

import notes, { TNote } from "../mocks/notes";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    reply.status(200).send(notes);
  });

  fastify.post("/", async (request, reply) => {
    const {
      author_id,
      title,
      description,
      content,
    }: {
      author_id: string;
      title: string;
      description: string;
      content: string;
    } = request.body as {
      author_id: string;
      title: string;
      description: string;
      content: string;
    };

    if (!title || !description || !content) {
      reply.status(400).send({
        error: "Missing required data",
      });
      return;
    }

    const newNote: TNote = {
      id: notes.length + 1,
      title,
      description,
      author_id: Number(author_id),
      metadata: {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
      content,
    };

    notes.push(newNote);

    reply.status(201);
  });
}
