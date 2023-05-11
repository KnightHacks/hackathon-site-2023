import { Montserrat } from "next/font/google";
import Navbar from "./Navbar";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.className}`}>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-md px-6">{children}</main>
    </div>
  );
}
