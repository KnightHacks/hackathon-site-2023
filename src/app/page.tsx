import { cookies } from "next/headers";
import { UserState } from "../utils";
import NavMenu from "./Navbar";
import {
  AboutSection,
  FAQSection,
  HackersGuideSection,
  MainSection,
  SponsorsSection,
} from "./Sections";

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
