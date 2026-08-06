import type { ContactPayload } from '../repositories/contact.repository.js';
import { saveContact } from '../repositories/contact.repository.js';

export async function handleContactSubmission(payload: ContactPayload): Promise<void> {
  // TODO: contenu à compléter — ajouter envoi email (SMTP) si besoin
  await saveContact(payload);
}
