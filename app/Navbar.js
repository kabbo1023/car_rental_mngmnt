"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, [path]);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="nav">
      <Link href="/" className="logo">🚗 QuickRide</Link>
      <div className="links">
        <Link href="/cars">Ride Options</Link>
        <Link href="/about">About Us</Link>
        {user ? (
          <>
            <span className="hello">Hi, {user.name}</span>
            <button className="btn small" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup" className="btn small">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
