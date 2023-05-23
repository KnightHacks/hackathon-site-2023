import { Montserrat } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar";

const spectral = Montserrat({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spectral.className} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="px-8">{children}</main>
      <Footer />
    </div>
  );
}
