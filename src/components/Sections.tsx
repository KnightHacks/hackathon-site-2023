"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "next/link";
import { scrollToElementById } from "../utils";
import { BlackDragonFullLogo } from "./Logos";

export function MainSection() {
  return (
    <section
      id="main"
      className="mx-auto flex min-h-screen flex-col items-center justify-center font-serif"
    >
      <BlackDragonFullLogo className="mb-4 max-w-xl" />
      <div className="mb-8 text-2xl uppercase">October 6-8</div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Link
          href="/apply"
          className="border border-black bg-black py-3 text-center font-medium uppercase text-white transition hover:bg-white hover:text-black"
        >
          Apply
        </Link>
        <button
          onClick={() => scrollToElementById("#sponsors")}
          className="border border-black py-3 text-center font-medium uppercase transition hover:bg-black hover:text-white"
        >
          Sponsors
        </button>
        <Link
          className="border border-black py-3 text-center font-medium uppercase transition hover:bg-black hover:text-white"
          href="https://discord.gg/Kv5g9vf"
        >
          Discord
        </Link>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto mb-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="about"
        className="mb-2 text-left font-serif text-4xl font-bold uppercase"
      >
        About
      </div>
      <div className="max-w-screen-md text-lg">
        <p className="mb-4">
          Ready to kickstart your career in tech? Join us for Knighthacks!
          Students from around the world will come together to learn the latest
          technologies, develop innovative solutions, network with top
          companies, and more! This year, we are excited to announce two
          features to this year&apos;s hackathon; we are an MLH season starter
          hackathon and we have partnered with Hack@UCF to bring you the Horse
          Plinko Cyber Challenge, a blue team vs. red team competition as well
          as cybersecurity convention! Along with all our amazing workshops, you
          also have the chance work together to build exciting projects, meet
          recruiters and land job opportunities, win prizes, get swag, and have
          fun!
        </p>
      </div>
    </section>
  );
}

export function FAQSection() {
  const questionAndAnswers = [
    {
      question: "What is a hackathon?",
      answer:
        "A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovative projects.",
    },
    {
      question: "How long is KnightHacks?",
      answer:
        "Knighthacks is a 36-hour hackathon, beginning at 4pm on Friday and ending at 3pm on Sunday. We encourage you to work on your project for as long as you can during this time.",
    },
    {
      question: "Who can attend?",
      answer:
        "If you’re currently a college student or have graduated in the past year (are we allowing recent grads?), you're more than welcome to attend!",
    },
    {
      question: "How much experience do I need?",
      answer:
        "None! We welcome students from all academic backgrounds and skill levels, so don’t be afraid to come and join us! We’ll have introductory workshops for you to learn new skills, industry mentors to help you out, and great tools to build your projects. Whether you’ve never coded before or have lots of experience, there’s a place for you at KnightHacks!",
    },
    {
      question: "Do I need to have a team?",
      answer:
        "Not at all! You can be a lone wolf, come with a team (no more than four people), or join some teams at KnightHacks. We’ll also have team building activities to help you find the right teammates!",
    },
    {
      question: "How much does it cost?",
      answer:
        "Nothing! That’s right, KnightHacks is entirely free for all attendees to participate. All you need to worry about is learning new skills, developing cool projects, and having fun!",
    },
    {
      question: "What if I don’t have a project idea?",
      answer:
        "No worries! We’ll have plenty of workshops and mentors to help you come up with ideas and build your project.",
    },
    {
      question: "What is the Horse Plinko Cyber Challenge?",
      answer:
        "Horse Plinko Cyber Challenge (HPCC) is a beginner-oriented cybersecurity competition run by Hack@UCF. HPCC is a red team vs. blue team competition, where the blue team is given a real world scenario that puts them in charge of securing a fictitious company’s computers and to keep the red team out of the computers. ",
    },
    {
      question: "Can I participate in both the hackathon and Horse Plinko?",
      answer:
        "Absolutely! Knighthacks encourages attendees to explore and try new things.",
    },
  ];

  return (
    <section className="mx-auto my-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="faq"
        className="mb-4 text-center font-serif text-4xl font-bold uppercase"
      >
        FAQ
      </div>
      <ul className="mx-auto flex max-w-screen-md flex-col gap-3 text-center">
        {questionAndAnswers.map(({ question, answer }, i) => (
          <li key={i}>
            <Collapsible.Root>
              <Collapsible.Trigger className="font-serif text-xl uppercase leading-tight">
                {question}
              </Collapsible.Trigger>
              <Collapsible.Content className="mb-3 mt-1.5">
                {answer}
              </Collapsible.Content>
            </Collapsible.Root>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HackersGuideSection() {
  return (
    <section className="mx-auto my-24 max-w-screen-lg">
      <div id="guide" className="mb-2 font-serif text-4xl font-bold uppercase">
        Hackers Guide
      </div>
      <p className="text-lg">Coming soon...</p>
    </section>
  );
}

export function SponsorsSection() {
  const sponsors = Array.from({ length: 18 });

  return (
    <section className="lex mx-auto mb-52 max-w-screen-lg flex-col justify-center">
      <div
        id="sponsors"
        className="mb-4 text-center font-serif text-4xl font-bold uppercase"
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
