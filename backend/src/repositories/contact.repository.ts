import { db } from '../db/client.js';
import { contacts } from '../db/schema.js';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function saveContact(payload: ContactPayload): Promise<void> {
  await db.insert(contacts).values(payload);
}
