"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { scrollToElementById } from "../utils";
import { BlackDragonFullLogo } from "./Logos";
import { FadeInSection } from "./FadeInSection";

export function MainSection() {
  return (
    <FadeInSection
      id="main"
      className="mx-auto mb-24 flex min-h-screen flex-col items-center justify-center font-serif"
    >
      <BlackDragonFullLogo className="mb-4 max-w-xl" />
      <div className="mb-8 text-2xl uppercase">October 6-8</div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Link
          href="/apply"
          prefetch={false}
          className="border border-black bg-black py-3 text-center font-medium uppercase text-white transition"
        >
          Apply
        </Link>
        <button
          onClick={() => scrollToElementById("#sponsors")}
          className="border border-black py-3 text-center font-medium uppercase transition hover:bg-[#f5f5f5]"
        >
          Sponsors
        </button>
        <Link
          href="https://discord.gg/Kv5g9vf"
          className="border border-black py-3 text-center font-medium uppercase transition hover:bg-[#f5f5f5]"
        >
          Discord
        </Link>
      </div>
    </FadeInSection>
  );
}

export function AboutSection() {
  return (
    <FadeInSection
      id="about"
      className="mx-auto mb-24 flex max-w-screen-lg flex-col justify-center"
    >
      <div className="mb-2 text-left font-serif text-4xl font-bold uppercase">
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
    </FadeInSection>
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
    <FadeInSection className="mx-auto my-24 flex max-w-screen-lg flex-col justify-center">
      <div
        id="faq"
        className="mb-4 text-center font-serif text-4xl font-bold uppercase"
      >
        FAQ
      </div>
      <Accordion.Root
        defaultValue={questionAndAnswers[0].question}
        className="mx-auto flex max-w-screen-md flex-col gap-3 text-center"
        type="single"
      >
        {questionAndAnswers.map(({ question, answer }, i) => (
          <Accordion.Item
            value={question}
            key={i}
            className="overflow-hidden text-center"
          >
            <Accordion.Trigger className="font-serif text-xl uppercase leading-tight">
              {question}
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-hide data-[state=open]:animate-accordion-show">
              <div className="pb-3 pt-1.5">{answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </FadeInSection>
  );
}

export function HackersGuideSection() {
  return (
    <FadeInSection className="mx-auto my-24 max-w-screen-lg">
      <div id="guide" className="mb-2 font-serif text-4xl font-bold uppercase">
        Hackers Guide
      </div>
      <p className="text-lg">Coming soon...</p>
    </FadeInSection>
  );
}

export function SponsorsSection() {
  return (
    <FadeInSection className="lex mx-auto mb-52 max-w-screen-lg flex-col justify-center">
      <div
        id="sponsors"
        className="mb-4 text-center font-serif text-4xl font-bold uppercase"
      >
        Sponsors
      </div>
      <div className="grid gap-4 text-center">
        <div className="text-lg">Coming soon...</div>
      </div>
    </FadeInSection>
  );
}
