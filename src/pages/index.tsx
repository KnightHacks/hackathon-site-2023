import { Header } from "@/components/Header";
import { scrollTo } from "@/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="mx-auto px-8">
      <MainSection />
      <AboutSection />
      <FAQSection />
      <ScheduleSection />
      <SponsorsSection />
    </div>
  );
}

function MainSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-14 flex justify-center text-6xl font-bold">
        <Image
          width={500}
          height={500}
          src="/gold_dragon_full_logo.svg"
          alt="KnightHacks logo"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Link
          href="/register"
          className="border border-black bg-black py-4 text-center font-bold text-white"
        >
          Register
        </Link>
        <button
          onClick={() => scrollTo("#sponsors")}
          className="border py-4 text-center font-bold"
        >
          Sponsors
        </button>
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
      <Header id="about">About Us</Header>
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
      <Header id="faq">FAQ</Header>
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

function Event() {
  return (
    <li>
      <div className="text-2xl font-extrabold">Lorem Ipsum</div>
      <div className="text-lg">4:00 - 7:00 PM EST</div>
    </li>
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
    <section className="mb-10">
      <Header id="schedule">Schedule</Header>
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
  const sponsors = Array.from({ length: 20 });

  return (
    <section className="mb-10">
      <Header id="sponsors" className="text-center">
        Sponsors
      </Header>
      <div className="grid gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
        {sponsors.map((_, i) => (
          <div key={i} className="text-3xl font-extrabold uppercase">
            Lorem Ipsum
          </div>
        ))}
      </div>
    </section>
  );
}
