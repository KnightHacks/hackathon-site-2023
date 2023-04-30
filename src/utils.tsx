export const scrollTo = (id: string) => {
  const element: HTMLElement = document.querySelector(id)!;
  window?.scrollTo({ behavior: "smooth", top: element.offsetTop - 100 });
}