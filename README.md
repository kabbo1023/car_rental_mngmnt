# QuickRide – Car Rental Management System

Next.js + MySQL. Features: Login, Sign Up, About Us, Ride Options (pick a date → see which cars are free → book).

## 1. Get a free MySQL database (TiDB Cloud – no credit card)
1. Sign up at https://tidbcloud.com and create a free **Starter** instance.
2. Click **Connect** → copy the connection string.
3. Create the database once in its SQL editor: `CREATE DATABASE car_rental;`

## 2. Run locally
```bash
npm install
cp .env.example .env.local     # paste your DATABASE_URL, set a SESSION_SECRET
npm run db:setup               # creates tables + 6 sample cars
npm run dev                    # open http://localhost:3000
```

## 3. Deploy free on Vercel
1. Push this folder to GitHub.
2. Import the repo at https://vercel.com/new.
3. Add the env vars `DATABASE_URL`, `DB_SSL=true`, `SESSION_SECRET`.
4. Click **Deploy**.

## Files
| Path | What it does |
|---|---|
| `app/cars/page.js` | Ride options, date picker, availability, booking |
| `app/login`, `app/signup`, `app/about` | The other pages |
| `app/api/*` | Backend: signup, login, logout, cars, book |
| `scripts/schema.sql` | Tables: users, cars, bookings |
| `scripts/setup-db.js` | Creates tables and adds sample cars |

A car can be booked only once per day (enforced by the database).
# car_rental_mngmnt
