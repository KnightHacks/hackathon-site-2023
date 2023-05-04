import { HTMLAttributes } from "react";

export function Header({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <div {...rest} className={`mb-2 text-xl font-bold ${className}`}>{children}</div>
  );
}
