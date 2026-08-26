import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';

const distUrl = new URL('../dist/', import.meta.url);
const clientUrl = new URL('../dist/client/', import.meta.url);

await mkdir(clientUrl, { recursive: true });

for (const entry of await readdir(distUrl, { withFileTypes: true })) {
  if (entry.name === 'client' || entry.name === 'server') continue;
  await rename(new URL(entry.name, distUrl), new URL(entry.name, clientUrl));
}

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.includes('.')) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    }

    return response;
  },
};
`;

await mkdir(new URL('../dist/server/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/server/index.js', import.meta.url), worker, 'utf8');
