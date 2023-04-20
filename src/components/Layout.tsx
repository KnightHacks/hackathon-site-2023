import { Inter } from "next/font/google";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className}`}>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-md px-6">{children}</main>
    </div>
  );
}
