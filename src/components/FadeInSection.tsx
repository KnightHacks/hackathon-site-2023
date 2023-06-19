"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInSectionProps extends React.HTMLAttributes<HTMLDivElement> {}
export function FadeInSection(props: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(entry.isIntersecting);
      });
    });
    observer.observe(sectionRef.current as HTMLDivElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      {...props}
      className={`${
        props.className
      } translate-y-4 opacity-0 transition-all duration-1000 will-change-auto ${
        isVisible ? "visible transform-none opacity-100" : "invisible"
      }`}
    />
  );
}
