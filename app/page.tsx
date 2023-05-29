import {
  AboutSection,
  FAQSection,
  HackersGuideSection,
  MainSection,
  SponsorsSection,
} from "./Sections";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-8">
        <MainSection />
        <AboutSection />
        <HackersGuideSection />
        <FAQSection />
        <SponsorsSection />
      </div>
    </>
  );
}
