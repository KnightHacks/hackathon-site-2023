import NavMenu from "@/components/Navbar";
import { cookies } from "next/headers";
import {
  AboutSection,
  FAQSection,
  HackersGuideSection,
  MainSection,
  SponsorsSection,
} from "../components/Sections";
import { UserState } from "../utils";

export default function Home() {
  let userState: UserState;

  const accessToken = cookies().get("accessToken");
  const encryptedOAuthAccessToken = cookies().get("encryptedOAuthAccessToken");

  if (accessToken) userState = "User";
  else if (encryptedOAuthAccessToken) userState = "OAuth";
  else userState = "Guest";

  return (
    <>
      <NavMenu userState={userState} />
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
