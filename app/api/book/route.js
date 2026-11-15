import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Please log in to book." }, { status: 401 });

  const { carId, date } = await req.json();
  const today = new Date().toISOString().slice(0, 10);
  if (!carId || !date || date < today)
    return Response.json({ error: "Pick a valid date (today or later)." }, { status: 400 });

  try {
    await db.query("INSERT INTO bookings (user_id, car_id, booking_date) VALUES (?, ?, ?)", [user.id, carId, date]);
    return Response.json({ ok: true });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY")
      return Response.json({ error: "Sorry, this car is already booked that day." }, { status: 409 });
    throw e;
  }
}
