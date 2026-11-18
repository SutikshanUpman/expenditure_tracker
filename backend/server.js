import { db } from './config/db.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 5000);
const app = createApp(db, { frontendUrl: process.env.FRONTEND_URL });
const server = app.listen(port, process.env.HOST || '127.0.0.1', () =>
  console.log(`SpendWise API: http://localhost:${port}`),
);
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(async () => {
      await db.end();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  });
}
