"use client";
import { useEffect, useState } from "react";

const today = () => new Date().toISOString().slice(0, 10);

export default function Cars() {
  const [date, setDate] = useState(today());
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("all");
  const [msg, setMsg] = useState(null);

  async function load() {
    const r = await fetch(`/api/cars?date=${date}`);
    setCars((await r.json()).cars || []);
  }
  useEffect(() => { load(); }, [date]);

  async function book(car) {
    setMsg(null);
    const r = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carId: car.id, date }),
    });
    const d = await r.json();
    setMsg(r.ok ? { ok: true, text: `✅ ${car.name} booked for ${date}!` } : { ok: false, text: d.error });
    load();
  }

  const shown = filter === "available" ? cars.filter((c) => c.available) : cars;
  const freeCount = cars.filter((c) => c.available).length;

  return (
    <section>
      <h1>Ride Options</h1>
      <div className="toolbar">
        <label>Pick a day: <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All cars</option>
          <option value="available">Only available</option>
        </select>
        <span className="muted">{freeCount} of {cars.length} cars free on this day</span>
      </div>

      {msg && <p className={msg.ok ? "success" : "error"}>{msg.text}</p>}

      <div className="grid">
        {shown.map((car) => (
          <div key={car.id} className="car">
            <img src={car.image} alt={car.name} />
            <div className="car-body">
              <h3>{car.name}</h3>
              <p className="muted">{car.type} · {car.seats} seats</p>
              <p className="price">${Number(car.price_per_day)} <span>/ day</span></p>
              <span className={car.available ? "badge ok" : "badge no"}>
                {car.available ? "Available" : "Booked"}
              </span>
              <button className="btn" disabled={!car.available} onClick={() => book(car)}>
                {car.available ? "Book this car" : "Not available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
