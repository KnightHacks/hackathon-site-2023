import { scrollTo } from "@/utils";
import { Disclosure } from "@headlessui/react";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <FAQSection />
      <HackersGuideSection />
      <ScheduleSection />
      <SponsorsSection />
    </>
  );
}

function MainSection() {
  return (
    <section
      id="main"
      className="mx-auto flex min-h-screen flex-col items-center justify-center"
    >
      <Image
        className="mx-auto mb-4"
        width={640 * 0.9}
        height={640 * 0.9}
        src="/black_dragon_full_logo.svg"
        alt="KnightHacks logo"
      />
      <div className="mb-8 text-2xl" style={cinzel.style}>
        October 6-8
      </div>
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
    <section className="mx-auto mb-40 flex max-w-screen-lg flex-col justify-center">
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
          laboriosam voluptatibus quibusdam mollitia voluptates iste soluta!
          Molestias ullam quidem obcaecati esse fuga, voluptates atque at
          soluta, sequi omnis eaque nobis sunt possimus sed accusantium.
          Sapiente nisi beatae dolor omnis ipsum repellendus cupiditate sit
          tenetur accusamus ex?
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
    question: `Lorem ipsum dolor sit amet consectetur adipisicing elit?`,
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  }));

  return (
    <section className="mx-auto mb-40 max-w-screen-lg">
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
      <div className="mx-auto max-w-sm text-lg">
        {questionsAnswers.map(({ question, answer }, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <>
                <Disclosure.Button className="text-left">
                  {question}
                </Disclosure.Button>
                <Disclosure.Panel className="mb-3 mt-2">
                  {answer}
                </Disclosure.Panel>
              </>
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
    <section className="mx-auto mb-40 max-w-screen-lg">
      <div
        id="schedule"
        className="mb-2 text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        Hackers Guide
      </div>
      <p>Coming soon...</p>
    </section>
  );
}

function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Fri, Oct 6", "Sat, Oct 7", "Sun, Oct 8"];

  const selectedDayStyles =
    "border border-black px-6 py-2 font-bold text-white bg-black";
  const unselectedDayStyles =
    "border border-black px-6 py-2 font-bold text-black";

  // TODO: Render out particular schedule based on the selected day
  return (
    <section className="mx-auto mb-40 max-w-screen-lg">
      <div
        id="schedule"
        className="mb-4 text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        Schedule
      </div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={
              i === selectedDay ? selectedDayStyles : unselectedDayStyles
            }
          >
            {day}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Event key={i} />
        ))}
      </ul>
    </section>
  );
}

function SponsorsSection() {
  const sponsors = Array.from({ length: 18 });

  return (
    <section className="mx-auto mb-40 max-w-screen-lg">
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
