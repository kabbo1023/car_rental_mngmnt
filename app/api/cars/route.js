import { db } from "@/lib/db";

// GET /api/cars?date=YYYY-MM-DD  -> all cars + whether each is free that day
export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date");
  const [cars] = await db.query(
    `SELECT c.*, (b.id IS NULL) AS available
       FROM cars c
       LEFT JOIN bookings b ON b.car_id = c.id AND b.booking_date = ?
      ORDER BY c.id`,
    [date || "1900-01-01"]
  );
  return Response.json({ cars: cars.map((c) => ({ ...c, available: !!Number(c.available) })) });
}
