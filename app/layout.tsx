import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import { ApolloWrapper } from "./lib/apollo-provider";

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
      <body style={monteserrat.style} className="flex min-h-screen flex-col">
        <Navbar />
        <ApolloWrapper>
          <div className="px-6">{children}</div>
        </ApolloWrapper>
        <Footer />
      </body>
    </html>
  );
}
