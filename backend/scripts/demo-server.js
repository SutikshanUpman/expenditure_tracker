// Explicit development-only preview using embedded PostgreSQL. Data resets on restart.
import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { createApp } from '../app.js';

const db = new PGlite();
for (const file of ['schema.sql', 'seed.sql', 'demo.sql']) {
  await db.exec(await readFile(new URL(`../../database/${file}`, import.meta.url), 'utf8'));
}
const server = createApp(db).listen(5000, '127.0.0.1', () =>
  console.log('SpendWise demo API: http://localhost:5000 (temporary sample data)'),
);
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () =>
    server.close(async () => {
      await db.close();
      process.exit(0);
    }),
  );
