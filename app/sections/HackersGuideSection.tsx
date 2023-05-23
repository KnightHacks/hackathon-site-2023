import { cinzel } from "../lib/utils";

export function HackersGuideSection() {
  return (
    <section className="mx-auto my-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="guide"
        className="mb-2 text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        Hackers Guide
      </div>
      <p className="text-lg">Coming soon...</p>
    </section>
  );
}
