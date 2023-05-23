import { AboutSection } from "./sections/AboutSection";
import { FAQSection } from "./sections/FAQSection";
import { HackersGuideSection } from "./sections/HackersGuideSection";
import { MainSection } from "./sections/MainSection";
import { SponsorsSection } from "./sections/SponsorsSection";

export default function Home() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <HackersGuideSection />
      <FAQSection />
      <SponsorsSection />
    </>
  );
}
