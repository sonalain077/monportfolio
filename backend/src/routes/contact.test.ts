import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../repositories/contact.repository.js', () => ({
  saveContact: vi.fn().mockResolvedValue(undefined),
}));

import Fastify from 'fastify';
import { contactRoute } from '../routes/contact.js';

function buildApp() {
  const app = Fastify();
  app.register(contactRoute, { prefix: '/api' });
  return app;
}

describe('POST /api/contact', () => {
  it('retourne 201 avec un payload valide', async () => {
    const app = buildApp();
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Alice', email: 'alice@example.com', message: 'Bonjour, test de contact.' },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toEqual({ ok: true });
  });

  it('retourne 400 avec un email invalide', async () => {
    const app = buildApp();
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Alice', email: 'pas-un-email', message: 'Message de test.' },
    });
    expect(res.statusCode).toBe(400);
  });

  it('retourne 400 avec un message trop court', async () => {
    const app = buildApp();
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Alice', email: 'alice@example.com', message: 'Court' },
    });
    expect(res.statusCode).toBe(400);
  });
});
