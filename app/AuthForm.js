"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch(`/api/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error);
    router.push("/cars");
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <form className="card narrow form" onSubmit={submit}>
      <h1>{isSignup ? "Create account" : "Login"}</h1>
      {isSignup && <input placeholder="Full name" value={form.name} onChange={set("name")} required />}
      <input type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
      <input type="password" placeholder="Password" value={form.password} onChange={set("password")} required />
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>{loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}</button>
      <p className="muted">
        {isSignup ? <>Have an account? <Link href="/login">Login</Link></> : <>New here? <Link href="/signup">Sign up</Link></>}
      </p>
    </form>
  );
}
