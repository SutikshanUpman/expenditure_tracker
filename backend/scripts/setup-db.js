import { readFile } from 'node:fs/promises';
import { db } from '../config/db.js';

try {
  for (const name of [
    'schema.sql',
    'seed.sql',
    ...(process.argv.includes('--demo') ? ['demo.sql'] : []),
  ]) {
    await db.query(await readFile(new URL(`../../database/${name}`, import.meta.url), 'utf8'));
    console.log(`Applied ${name}`);
  }
} catch (error) {
  console.error('Database setup failed:', error.message);
  process.exitCode = 1;
} finally {
  await db.end();
}
