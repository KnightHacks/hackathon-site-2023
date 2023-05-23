import { cinzel, scrollTo } from "@/utils";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <FAQSection />
      <HackersGuideSection />
      <SponsorsSection />
    </>
  );
}

function MainSection() {
  return (
    <section
      id="main"
      className="mx-auto flex min-h-screen flex-col items-center justify-center"
      style={cinzel.style}
    >
      <Image
        className="mx-auto mb-4"
        width={640 * 0.9}
        height={640 * 0.9}
        src="/black_dragon_full_logo.svg"
        alt="KnightHacks logo"
      />
      <div className="mb-8 text-2xl">October 6-8</div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Link
          href="/register"
          className="border border-black bg-black py-3 text-center font-bold text-white"
        >
          Register
        </Link>
        <button
          className="border border-black py-3 text-center font-bold"
          role="link"
          onClick={() => scrollTo("#sponsors")}
        >
          Sponsors
        </button>
        <Link
          className="border border-black py-3 text-center font-bold"
          href="https://discord.gg/Kv5g9vf"
        >
          Discord
        </Link>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mx-auto mb-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="about"
        className="mb-2 text-left text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        About
      </div>
      <div className="max-w-screen-md text-lg">
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          veritatis libero, voluptatum consectetur distinctio placeat aperiam
          quaerat corporis quas itaque a, corrupti explicabo eligendi quisquam
          doloremque suscipit nulla maiores eaque? Expedita nam omnis inventore
          architecto accusantium. Nemo aliquid ab unde sequi possimus esse
          temporibus officiis non ipsam ea eius molestiae porro molestias, enim
          laboriosam voluptatibus
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          consequatur rerum sint, illo expedita architecto deserunt earum
          sapiente, facilis, perspiciatis accusantium iste quaerat totam.
          Repudiandae, aspernatur natus. Minima, et commodi! Soluta veritatis
          distinctio ab, veniam animi velit perferendis omnis molestias quod
          vero inventore suscipit in perspiciatis optio a! Officiis, accusantium
          perferendis? Cupiditate, dignissimos veniam distinctio repellendus
          perferendis mollitia eligendi consequuntur.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const QAs = Array.from({ length: 4 }, (_, i) => ({
    question: `Lorem ipsum dolor sit amet consectetur?`,
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  }));

  return (
    <section className="mx-auto my-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="faq"
        className="mb-4 text-center text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        FAQ
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <FAQ category="General" questionsAnswers={QAs} />
        <FAQ category="Tracks & Teams" questionsAnswers={QAs} />
        <FAQ category="Registration" questionsAnswers={QAs} />
        <FAQ category="Logistics" questionsAnswers={QAs} />
      </div>
    </section>
  );
}

type FAQCategory = "General" | "Tracks & Teams" | "Registration" | "Logistics";

interface QuestionAnswer {
  question: string;
  answer: string;
}

function FAQ({
  category,
  questionsAnswers,
}: {
  category: FAQCategory;
  questionsAnswers: QuestionAnswer[];
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="font mb-2 text-2xl font-semibold uppercase"
        style={cinzel.style}
      >
        {category}
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-col gap-1 text-lg">
        {questionsAnswers.map(({ question, answer }, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <div>
                <Disclosure.Button className="text-left">{question}</Disclosure.Button>
                <Disclosure.Panel className="mb-3 mt-1.5">
                  {answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

function Event() {
  return (
    <li>
      <div className="text-2xl font-bold" style={cinzel.style}>
        Lorem Ipsum
      </div>
      <div className="text-lg">4:00 - 7:00 PM EST</div>
    </li>
  );
}

function HackersGuideSection() {
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

function SponsorsSection() {
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
