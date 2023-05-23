import { cinzel } from "../lib/utils";

export function SponsorsSection() {
  const sponsors = Array.from({ length: 18 });

  return (
    <section className="mx-auto mb-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="sponsors"
        className="mb-4 text-center text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        Sponsors
      </div>
      <div className="grid gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
        {sponsors.map((_, i) => (
          <div key={i} className="text-3xl uppercase">
            Lorem Ipsum
          </div>
        ))}
      </div>
    </section>
  );
}
