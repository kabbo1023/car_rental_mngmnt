import mysql from "mysql2/promise";

// One shared connection pool (reused across hot reloads in dev)
const g = globalThis;
export const db =
  g._pool ||
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { minVersion: "TLSv1.2", rejectUnauthorized: true } : undefined,
    connectionLimit: 5,
    dateStrings: true,
  });
if (process.env.NODE_ENV !== "production") g._pool = db;
