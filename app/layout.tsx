import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const monteserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={monteserrat.style}>
        <Navbar />
        <div className="px-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
