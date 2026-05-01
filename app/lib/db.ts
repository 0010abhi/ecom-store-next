import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '@/db/schema';

const pool = mysql.createPool({
  host:             process.env.DB_HOST     || 'localhost',
  user:             process.env.DB_USER     || 'root',
  password:         process.env.DB_PASSWORD || 'root1234',
  database:         process.env.DB_NAME     || 'fakestore',
  waitForConnections: true,
  connectionLimit:  10,
  queueLimit:       0,
});

export const db = drizzle(pool, { schema, mode: 'default' });

// Raw pool kept for backward compatibility — remove once all raw-SQL usages are converted.
export default pool;
