import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <h1>Rent a car in seconds</h1>
      <p>Pick a date, see which cars are free, and book your ride.</p>
      <Link href="/cars" className="btn">See Ride Options</Link>
    </section>
  );
}
