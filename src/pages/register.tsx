import { Header } from "@/components/Header";
import { countries, graduationYears } from "@/utils";

export default function Registration() {
  return (
    <div className="mx-auto mb-10 mt-28 w-full max-w-screen-md px-6">
      <form>
        <Header>Welcome Hacker!</Header>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border px-4 py-3"
            placeholder="First Name"
            id="firstName"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="border px-4 py-3"
            placeholder="Last Name"
            id="lastName"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label
            className="w-min cursor-pointer whitespace-nowrap border px-4 py-3"
            placeholder="Resume"
            htmlFor="resume"
          >
            Upload Resume
          </label>
          <input className="hidden" id="resume" type="file" />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="track">
            What track would you like to join for the hackathon?
          </label>
          <select id="track" className="border px-4 py-3">
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
            <option value="cybersecurity">Cybersecurity</option>
          </select>
        </div>
        <Header>About You</Header>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="ethnicity">
            Ethnicity
          </label>
          <select id="ethnicity" className="border px-4 py-3">
            <option value="americanIndianOrAlaskaNative">
              American Indian or Alaska Native
            </option>
            <option value="asian">Asian</option>
            <option value="blackOrAfricanAmerican">
              Black or African American
            </option>
            <option value="hispanicOrLatino">Hispanic or Latino</option>
            <option value="middleEastern">Middle Eastern</option>
            <option value="nativeHawaiianOrOtherPacificIslander">
              Native Hawaiian or Other Pacific Islander
            </option>
            <option value="white">White</option>
            <option value="twoOrMore">Two or more</option>
          </select>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="country">
            Country
          </label>
          <select id="country" className="border px-4 py-3">
            {countries.map((country) => (
              <option key={country} value={country.toLowerCase()}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="birthdate">
            Birth Date
          </label>
          <input className="border px-4 py-3" id="birthdate" type="date" />
        </div>
        <Header>Contact</Header>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="border px-4 py-3"
            placeholder="Phone Number"
            id="phoneNumber"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="border px-4 py-3"
            placeholder="Email"
            id="email"
            type="email"
          />
        </div>
        <Header>School</Header>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="school">
            School
          </label>
          <input
            className="border px-4 py-3"
            placeholder="School"
            id="school"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="major">
            Major
          </label>
          <input
            className="border px-4 py-3"
            placeholder="Major"
            id="major"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="yearInCollege">
            Year in College
          </label>
          <select className="border px-4 py-3" id="yearInCollege">
            <option value="freshman">Freshman</option>
            <option value="sophmore">Sophmore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="graduationYear">
            Graduation Year
          </label>
          <select className="border px-4 py-3" id="graduationYear">
            {graduationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Header>Hackathon</Header>
        <label className="mb-4 inline-block" htmlFor="share">
          <span className="mb-1">
            Is it okay if we share your information (name, resume, graduation
            year, etc.) with sponsors?
          </span>
          <div className="mt-1.5 flex items-center">
            <input className="mr-3" id="share" type="checkbox" />
            <span>I am comfortable with sharing my information</span>
          </div>
        </label>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="why">
            Why are you attending KnightHacks?
          </label>
          <textarea className="border px-4 py-3" id="why" />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="learn">
            What do you hope to learn at KnightHacks?
          </label>
          <textarea className="border px-4 py-3" id="learn" />
        </div>
        <Header>External Links</Header>
        <div className="mb-2">
          Note: these are optional, but most technical applications ask for
          them! Make a Github/LinkedIn account today if you don’t have one.
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="github">
            GitHub
          </label>
          <input
            className="border px-4 py-3"
            placeholder="GitHub"
            id="github"
            type="url"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1" htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            className="border px-4 py-3"
            placeholder="LinkedIn"
            id="linkedin"
            type="url"
          />
        </div>
        <Header>Final Steps!</Header>
        <label className="mb-4 flex">
          <div>
            <input className="mr-3" type="checkbox" />
          </div>
          <p>Have you read and understood the MLH Code of Conduct?</p>
        </label>
        <label className="mb-4 flex">
          <div>
            <input className="mr-3" type="checkbox" />
          </div>
          <span>
            I authorize you to share my application/registration information
            with Major League Hacking for event administration, ranking, and MLH
            administration in-line with the MLH Privacy Policy. I further agree
            to the terms of both the MLH Contest Terms and Conditions and the
            MLH Privacy Policy.
          </span>
        </label>
        <label className="mb-4 flex">
          <div>
            <input className="mr-3" type="checkbox" />
          </div>
          <p>
            I authorize Major League Hacking to send me occasional messages
            about hackathons including pre- and post-event informational emails.
          </p>
        </label>
        <button className="w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
