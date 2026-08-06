import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { handleContactSubmission } from '../services/contact.service.js';

const contactBodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(2000),
});

export const contactRoute: FastifyPluginAsync = async (app) => {
  app.post('/contact', async (request, reply) => {
    const parsed = contactBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Données invalides', details: parsed.error.flatten() });
    }

    await handleContactSubmission(parsed.data);
    return reply.status(201).send({ ok: true });
  });
};
