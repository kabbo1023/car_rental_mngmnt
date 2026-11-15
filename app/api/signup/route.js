import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

export async function POST(req) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password || password.length < 6)
    return Response.json({ error: "Fill all fields (password min 6 chars)." }, { status: 400 });

  const [exists] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (exists.length) return Response.json({ error: "Email already registered." }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  const [r] = await db.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hash]);
  await setSession({ id: r.insertId, name });
  return Response.json({ ok: true });
}
