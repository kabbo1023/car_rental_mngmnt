import "./globals.css";
import Navbar from "./Navbar";

export const metadata = { title: "QuickRide – Car Rental", description: "Simple car rental system" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <footer>© {new Date().getFullYear()} QuickRide Car Rental</footer>
      </body>
    </html>
  );
}
