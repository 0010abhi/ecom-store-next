import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  schema:  './db/schema.ts',
  out:     './db/migrations',
  dbCredentials: {
    host:     process.env.DB_HOST     ?? 'localhost',
    user:     process.env.DB_USER     ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root1234',
    database: process.env.DB_NAME     ?? 'fakestore',
  },
});
