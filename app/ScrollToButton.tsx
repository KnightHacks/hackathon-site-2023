"use client";

const scrollTo = (id: string) => {
  const element: HTMLElement = document.querySelector(id)!;
  window?.scrollTo({ behavior: "smooth", top: element.offsetTop - 90 });
};

export default function ScrollToButton({
  elementId,
  children,
  ...props
}: {
  elementId: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} onClick={() => scrollTo(elementId)}>
      {children}
    </button>
  );
}
