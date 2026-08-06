import Fastify from 'fastify';
import cors from '@fastify/cors';
import { contactRoute } from './routes/contact.js';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env.FRONTEND_URL ?? 'http://localhost:4321',
  methods: ['GET', 'POST'],
});

app.register(contactRoute, { prefix: '/api' });

app.get('/health', async () => ({ status: 'ok' }));

const port = Number(process.env.PORT ?? 3000);
try {
  await app.listen({ port, host: '0.0.0.0' });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
