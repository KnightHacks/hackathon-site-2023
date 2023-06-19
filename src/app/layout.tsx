  import { Cinzel, Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const monteserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    template: "KnightHacks | %s",
    default: "KnightHacks",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${monteserrat.variable} ${cinzel.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {children}
        <Footer />
      </body>
    </html>
  );
}
