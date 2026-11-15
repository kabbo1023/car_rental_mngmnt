// Run once: npm run db:setup  -> creates tables and adds sample cars
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const cars = [
  ["Toyota Corolla", "Sedan", 5, 45, "/cars/sedan.svg"],
  ["Honda CR-V", "SUV", 7, 70, "/cars/suv.svg"],
  ["Suzuki Swift", "Hatchback", 4, 35, "/cars/hatch.svg"],
  ["Mercedes E-Class", "Luxury", 5, 120, "/cars/luxury.svg"],
  ["Toyota HiAce", "Van", 12, 95, "/cars/van.svg"],
  ["Tesla Model 3", "Electric", 5, 90, "/cars/electric.svg"],
];

(async () => {
  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { minVersion: "TLSv1.2", rejectUnauthorized: true } : undefined,
    multipleStatements: true,
  });
  await conn.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
  const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM cars");
  if (n === 0) {
    await conn.query("INSERT INTO cars (name, type, seats, price_per_day, image) VALUES ?", [cars]);
    console.log("Added sample cars.");
  }
  console.log("Database ready ✅");
  await conn.end();
})().catch((e) => { console.error("Setup failed:", e.message); process.exit(1); });
