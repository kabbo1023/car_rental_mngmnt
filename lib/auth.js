import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.SESSION_SECRET || "dev-secret";
const sign = (v) => crypto.createHmac("sha256", SECRET).update(v).digest("hex");

// Cookie looks like "userId.name.signature"
export async function setSession(user) {
  const value = `${user.id}.${encodeURIComponent(user.name)}`;
  (await cookies()).set("session", `${value}.${sign(value)}`, {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getSession() {
  const raw = (await cookies()).get("session")?.value;
  if (!raw) return null;
  const i = raw.lastIndexOf(".");
  const value = raw.slice(0, i), sig = raw.slice(i + 1);
  if (sign(value) !== sig) return null;
  const [id, name] = value.split(".");
  return { id: Number(id), name: decodeURIComponent(name) };
}

export async function clearSession() {
  (await cookies()).delete("session");
}
