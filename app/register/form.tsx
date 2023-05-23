"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLProps, useState } from "react";
import {
  FieldError,
  Path,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import {
  cinzel,
  countries,
  ethnicities,
  graduationYears,
  schools,
  tracks,
} from "../lib/utils";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = (data) => {
    console.log(data);

    // TODO: Implement
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 text-xl font-bold" style={cinzel.style}>
        Welcome Hacker
      </div>
      <Input
        register={register}
        errorMessage={errors.firstName?.message}
        name="firstName"
        label="First Name"
        placeholder="John"
      />
      <Input
        register={register}
        name="lastName"
        errorMessage={errors.lastName?.message}
        label="Last Name"
        placeholder="Doe"
      />
      <ResumeUpload register={register} />
      <div className="mb-2 text-xl font-bold" style={cinzel.style}>
        About You
      </div>
      <Select
        register={register}
        name="ethnicity"
        label="Ethnicity"
        options={ethnicities}
      />
      <Select
        multiple
        register={register}
        errorMessage={errors.tracks?.message}
        name="tracks"
        label="Track"
        options={tracks}
      />
      <Select
        register={register}
        name="country"
        label="Country"
        options={countries}
      />
      <Input
        register={register}
        errorMessage={errors.birthdate?.message}
        name="birthdate"
        label="Birthdate"
        type="date"
      />
      <div className="mb-2 pt-4 text-xl font-bold" style={cinzel.style}>
        Contact
      </div>
      <Input
        register={register}
        errorMessage={errors.discord?.message}
        name="discord"
        label="Discord"
        placeholder="johndoe#1234"
      />
      <Input
        register={register}
        errorMessage={errors.phoneNumber?.message}
        name="phoneNumber"
        label="Phone Number"
        placeholder="(123) 456-7890"
      />
      <Input
        register={register}
        errorMessage={errors.email?.message}
        name="email"
        label="Email"
        placeholder="johndoe@knighthacks.com"
      />
      <div className="mb-2 pt-4 text-xl font-bold" style={cinzel.style}>
        School
      </div>
      <Select
        register={register}
        name="school"
        label="School"
        options={schools}
      />
      <Input
        register={register}
        errorMessage={errors.major?.message}
        name="major"
        label="Major"
        placeholder="Computer Science"
      />
      <Select
        register={register}
        name="graduationYear"
        label="Graduation Year"
        options={graduationYears}
      />
      <div className="mb-2 pt-4 text-xl font-bold" style={cinzel.style}>
        Hackathon
      </div>
      <p className="mb-1">
        Is it okay if we share your information (name, resume, graduation year,
        etc.) with sponsors?
      </p>
      <Checkbox
        register={register}
        name="isComfortableSharingInfo"
        label="I am comfortable with sharing my information with sponsors"
      />
      <TextArea
        register={register}
        name="whyAttending"
        label="Why are you attending KnightHacks?"
      />
      <TextArea
        register={register}
        name="whyAttending"
        label="What do you hope to learn at KnightHacks?"
      />
      <div className="mb-2 pt-4 text-xl font-bold" style={cinzel.style}>
        External Links
      </div>
      <div className="mb-2">
        Note: these are optional, but most technical applications ask for them!
        Make a Github/LinkedIn account today if you don’t have one.
      </div>
      <Input
        register={register}
        errorMessage={errors.github?.message}
        name="github"
        label="Github"
        placeholder="https://github.com/AwesomeSauce"
      />
      <Input
        register={register}
        errorMessage={errors.linkedin?.message}
        name="linkedin"
        label="LinkedIn"
        placeholder="https://www.linkedin.com/in/yourname/"
      />
      <div className="mb-2 pt-4 text-xl font-bold" style={cinzel.style}>
        Final Steps
      </div>
      <Checkbox
        register={register}
        errors={errors.hasReadMLHCodeOfConduct}
        name="hasReadMLHCodeOfConduct"
        label="I have read and agree to the MLH Code of Conduct"
      />
      <Checkbox
        register={register}
        errors={errors.isAuthorizedToShareAppWithMLH}
        name="isAuthorizedToShareAppWithMLH"
        label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational emails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further I agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
      />
      <Checkbox
        register={register}
        name="isSubscribedToMLHNewsletter"
        label="I authorize Major League Hacking to send me occasional messages about hackathons including pre- and post-event informational emails."
      />
      <button className="mt-6  w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
        Submit
      </button>
    </form>
  );
}

const ResumeUpload = ({
  register,
  ...props
}: {
  register: UseFormRegister<Fields>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="mb-8 flex flex-col">
      <label
        className="flex w-min cursor-pointer flex-col whitespace-nowrap border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
        placeholder="Resume"
        htmlFor="resume"
      >
        Upload Resume
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
      </label>
      {file && <p>{file.name}</p>}
    </div>
  );
};

const Input = ({
  label,
  name,
  register,
  errorMessage,
  ...props
}: {
  label: string;
  name: Path<Fields>;
  register: UseFormRegister<Fields>;
  errorMessage?: string;
} & HTMLProps<HTMLInputElement>) => {
  return (
    <label
      className={`mb-4 flex flex-col duration-200 ease-in-out  ${
        errorMessage && "text-red-500"
      }`}
      htmlFor={label}
    >
      <div>
        {label}
        {errorMessage && (
          <span className="text-sm italic text-red-500"> - {errorMessage}</span>
        )}
      </div>
      <input
        className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
          errorMessage
            ? "border-red-500 focus:ring-red-500"
            : " focus:ring-blue-500"
        }`}
        id={label}
        {...register(name)}
        {...props}
      />
    </label>
  );
};

const TextArea = ({
  label,
  name,
  register,
  ...props
}: {
  label: string;
  name: Path<Fields>;
  register: UseFormRegister<Fields>;
} & HTMLProps<HTMLTextAreaElement>) => {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={label}>{label}</label>
      <textarea
        className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500`}
        id={label}
        {...register(name)}
        {...props}
      />
    </div>
  );
};

const Select = ({
  label,
  name,
  options,
  register,
  errorMessage,
  ...props
}: {
  label: string;
  name: Path<Fields>;
  options: readonly string[];
  register: UseFormRegister<Fields>;
  errorMessage?: string;
} & HTMLProps<HTMLSelectElement>) => {
  return (
    <label
      className={`mb-4 flex flex-col duration-200 ease-in-out  ${
        errorMessage && "text-red-500"
      }`}
      htmlFor={props.id}
    >
      <div>
        {label}
        {errorMessage && (
          <span className="text-sm italic"> - {errorMessage}</span>
        )}
      </div>
      <select
        className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
          errorMessage
            ? "border-red-500 focus:ring-red-500"
            : " focus:ring-blue-500"
        }`}
        id={label}
        {...register(name)}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

function Checkbox({
  label,
  register,
  errors,
  name,
  ...props
}: {
  label: string;
  register: UseFormRegister<Fields>;
  errors?: FieldError;
  name: Path<Fields>;
} & HTMLProps<HTMLInputElement>) {
  return (
    <label className="mb-2 block" htmlFor={props.id}>
      <input className="mr-3" {...register(name)} {...props} type="checkbox" />
      <span>{label}</span>
      {errors && (
        <p className="text-sm italic text-red-500">{errors.message}</p>
      )}
    </label>
  );
}

const schema = z.object({
  firstName: z.string().nonempty("This field is required"),
  lastName: z.string().nonempty("This field is required"),
  resume: z.any(),
  tracks: z.array(z.enum(tracks)).min(1, "At least one track must be selected"),
  ethnicity: z.enum(ethnicities),
  country: z.enum(countries),
  birthdate: z.coerce.date({
    errorMap: () => ({
      message: "This field is required",
    }),
  }),
  phoneNumber: z.string().nonempty("This field is required"),
  email: z.string().nonempty("This field is required").email("Invalid email"),
  discord: z.string().optional().or(z.literal("")),
  school: z.string().nonempty("This field is required"),
  major: z.string().nonempty("This is field is required"),
  graduationYear: z.enum(graduationYears),
  isComfortableSharingInfo: z.boolean(),
  whyAttending: z.string().optional().or(z.literal("")),
  whatHopingToLearn: z.string().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  hasReadMLHCodeOfConduct: z.literal(true, {
    errorMap: () => ({
      message: "This field must be checked",
    }),
  }),
  isAuthorizedToShareAppWithMLH: z.literal(true, {
    errorMap: () => ({
      message: "This field must be checked",
    }),
  }),
  isSubscribedToMLHNewsletter: z.boolean(),
});

type Fields = z.infer<typeof schema>;
