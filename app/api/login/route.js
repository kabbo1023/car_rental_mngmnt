import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password || "", user.password_hash)))
    return Response.json({ error: "Wrong email or password." }, { status: 401 });
  await setSession(user);
  return Response.json({ ok: true });
}
