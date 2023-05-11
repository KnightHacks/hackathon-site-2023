import { Spectral } from "next/font/google";
import { HTMLAttributes } from "react";

const spectral = Spectral({ subsets: ["latin"], weight: "700" });

export function Header({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <div {...rest} className={`mb-2 text-xl font-bold uppercase ${spectral.className} ${className}`}>{children}</div>
  );
}
