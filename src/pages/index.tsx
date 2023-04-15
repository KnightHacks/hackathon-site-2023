import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <main className="px-6">
      <div className="mx-auto my-28 w-full max-w-screen-md border px-8">
        <MainSection />
        <AboutSection />
        <FAQSection />
        <ScheduleSection />
        <SponsorsSection />
      </div>
    </main>
  );
}

function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-2 text-xl font-bold ${className}`}>{children}</div>
  );
}

function MainSection() {
  return (
    <section className="mb-10" id="">
      <div className="my-8 text-center text-6xl font-bold">
        Knight <br />
        Hacks
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href="/register"
          className="border border-black bg-black py-4 text-center font-bold text-white"
        >
          Register
        </Link>
        <Link href="/" className="border py-4 text-center font-bold">
          Sponsors
        </Link>
        <Link
          href="https://discord.gg/Kv5g9vf"
          className="border py-4 text-center font-bold"
        >
          Discord
        </Link>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mb-10">
      <Header>About Us</Header>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum veritatis
        libero, voluptatum consectetur distinctio placeat aperiam quaerat
        corporis quas itaque a, corrupti explicabo eligendi quisquam doloremque
        suscipit nulla maiores eaque? Expedita nam omnis inventore architecto
        accusantium. Nemo aliquid ab unde sequi possimus esse temporibus
        officiis non ipsam ea eius molestiae porro molestias, enim laboriosam
        voluptatibus quibusdam mollitia voluptates iste soluta! Molestias ullam
        quidem obcaecati esse fuga, voluptates atque at soluta, sequi omnis
        eaque nobis sunt possimus sed accusantium. Sapiente nisi beatae dolor
        omnis ipsum repellendus cupiditate sit tenetur accusamus ex?
      </p>
    </section>
  );
}

function FAQSection() {
  const QAs = Array.from({ length: 5 }, (_, i) => ({
    question: `Question ${i}`,
    answer: `Answer ${i}`,
  }));

  return (
    <section className="mb-10">
      <Header>FAQ</Header>
      <FAQ QAs={QAs} />
    </section>
  );
}

interface QA {
  question: string;
  answer: string;
}

function FAQ({ QAs }: { QAs: QA[] }) {
  return (
    <div className="flex w-full flex-col gap-2 bg-white">
      {QAs?.map(({ question, answer }, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex w-full justify-between bg-black px-6 py-4 text-sm font-medium text-white">
                <span>{question}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="border-x border-b px-6 py-4 text-sm shadow">
                {answer}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Fri, Oct 6", "Sat, Oct 7", "Sun, Oct 8"];

  const selectedDayStyles =
    "border border-black px-6 py-2 font-bold text-white bg-black";
  const unselectedDayStyles =
    "border border-black px-6 py-2 font-bold text-black";

  return (
    <section className="mb-10">
      <Header>Schedule</Header>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
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
      <div>
        <div>{days[selectedDay]}</div>
        <ul>
          <li></li>
        </ul>
      </div>
    </section>
  );
}

function SponsorsSection() {
  const sponsors = Array.from({ length: 20 });

  return (
    <section className="mb-10">
      <Header className="text-center">Sponsors</Header>
      <div className="grid gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
        {sponsors.map((_, i) => (
          <div key={i} className="text-3xl font-semibold">
            Lorem Ipsum
          </div>
        ))}
      </div>
    </section>
  );
}
