"use client";

import { cinzel } from "../lib/utils";

export function FAQSection() {
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

import { Disclosure } from "@headlessui/react";

type FAQCategory = "General" | "Tracks & Teams" | "Registration" | "Logistics";

interface QuestionAnswer {
  question: string;
  answer: string;
}

export function FAQ({
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
                <Disclosure.Button className="text-left">
                  {question}
                </Disclosure.Button>
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
