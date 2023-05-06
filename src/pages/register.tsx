import { Header } from "@/components/Header";
import { countries, graduationYears, tracks } from "@/utils";
import { HTMLProps, useState } from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

const ResumeUpload = ({
  register,
  ...props
}: {
  register: UseFormRegister<Fields>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="mb-4 flex flex-col">
      <label
        className="w-min cursor-pointer whitespace-nowrap border px-4 py-3"
        placeholder="Resume"
        htmlFor="resume"
      >
        Upload Resume
      </label>
      <input
        {...props}
        {...register("resume", {
          onChange: (e) => {
            const file = e.target.files?.[0];
            if (file) setFile(file);
          },
        })}
        className="hidden"
        id="resume"
        type="file"
      />

      {file && <p>{file.name}</p>}
    </div>
  );
};

const Input = ({
  label,
  field,
  register,
  ...props
}: {
  label: string;
  field: keyof Fields;
  register: UseFormRegister<Fields>;
} & HTMLProps<HTMLInputElement>) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1" htmlFor={label}>
        {label}
      </label>
      <input
        className="border px-4 py-3"
        id={label}
        {...register(field)}
        {...props}
      />
    </div>
  );
};

const TextArea = ({
  label,
  field,
  register,
  ...props
}: {
  label: string;
  field: keyof Fields;
  register: UseFormRegister<Fields>;
} & HTMLProps<HTMLTextAreaElement>) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1" htmlFor={label}>
        {label}
      </label>
      <textarea
        className="border px-4 py-3"
        id={label}
        {...register(field)}
        {...props}
      />
    </div>
  );
};

const Select = ({
  label,
  field,
  options,
  register,
  ...props
}: {
  label: string;
  field: keyof Fields;
  options: string[];
  register: UseFormRegister<Fields>;
}) => {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1" htmlFor={label}>
        {label}
      </label>
      <select
        className="border px-4 py-3"
        id={label}
        {...register(field)}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

function Checkbox({
  text,
  register,
  field,
  ...props
}: {
  text: string;
  register: UseFormRegister<Fields>;
  field: keyof Fields;
} & HTMLProps<HTMLInputElement>) {
  return (
    <label className="mb-2 flex" htmlFor={props.id}>
      <div>
        <input
          className="mr-3"
          {...register(field)}
          {...props}
          type="checkbox"
        />
      </div>
      <span>{text}</span>
    </label>
  );
}

type Fields = {
  firstName: string;
  lastName: string;
  resume: File;
  track: string;
  ethnicity: string;
  country: string;
  birthdate: string;
  phoneNumber: string;
  email: string;
  school: string;
  major: string;
  graduationYear: string;
  isComfortableSharingInfo: boolean;
  whyAttending: string;
  whatHopingToLearn: string;
  github: string;
  linkedin: string;
  hasReadMLHCodeOfConduct: boolean;
  isAuthorizedToShareAppWithMLH: boolean;
  isSubscribedToMLHNewsletter: boolean;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data);
  return (
    <div className="mx-auto mb-10 mt-28 w-full max-w-screen-md px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Welcome Hacker!</Header>
        <Input
          register={register}
          field="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <Input
          register={register}
          field="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
        <ResumeUpload register={register} />
        <Header>About You</Header>
        <Select
          register={register}
          field="track"
          label="Track"
          options={tracks}
        />
        <Select
          register={register}
          field="country"
          label="Country"
          options={countries}
        />
        <Input
          register={register}
          field="birthdate"
          label="Birthdate"
          type="date"
        />
        <Header>Contact</Header>
        <Input
          register={register}
          field="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
        />
        <Input
          register={register}
          field="email"
          label="Email"
          placeholder="Email"
        />
        <Header>School</Header>
        <Input
          register={register}
          field="school"
          label="School"
          placeholder="School"
        />
        <Input
          register={register}
          field="major"
          label="Major"
          placeholder="Major"
        />
        <Select
          register={register}
          field="graduationYear"
          label="Graduation Year"
          options={graduationYears}
        />
        <Header>Hackathon</Header>
        <p>
          Is it okay if we share your information (name, resume, graduation
          year, etc.) with sponsors?
        </p>
        <Checkbox
          register={register}
          field="isComfortableSharingInfo"
          text="I am comfortable with sharing my information with sponsors"
        />
        <TextArea
          register={register}
          field="whyAttending"
          label="Why are you attending KnightHacks?"
        />
        <TextArea
          register={register}
          field="whyAttending"
          label="What do you hope to learn at KnightHacks?"
        />
        <Header>External Links</Header>
        <div className="mb-2">
          Note: these are optional, but most technical applications ask for
          them! Make a Github/LinkedIn account today if you don’t have one.
        </div>
        <Input
          register={register}
          field="github"
          label="Github"
          placeholder="Github"
        />
        <Input
          register={register}
          field="linkedin"
          label="LinkedIn"
          placeholder="LinkedIn"
        />
        <Header>Final Steps!</Header>
        <Checkbox
          register={register}
          field="hasReadMLHCodeOfConduct"
          text="I have read and agree to the MLH Code of Conduct"
        />
        <Checkbox
          register={register}
          field="isAuthorizedToShareAppWithMLH"
          text="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational emails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
        />
        <Checkbox
          register={register}
          field="isSubscribedToMLHNewsletter"
          text="I authorize you to share my provided information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
        />
        <button className="w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
