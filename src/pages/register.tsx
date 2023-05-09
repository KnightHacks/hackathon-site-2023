import { Header } from "@/components/Header";
import {
  countries,
  ethnicities,
  graduationYears,
  schools,
  tracks,
} from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLProps, useState } from "react";
import {
  FieldError,
  Path,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import * as z from "zod";

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
  name,
  register,
  errors,
  ...props
}: {
  label: string;
  name: Path<Fields>;
  register: UseFormRegister<Fields>;
  errors?: FieldError;
} & HTMLProps<HTMLInputElement>) => {
  return (
    <label
      className={`mb-4 flex flex-col duration-200 ease-in-out  ${
        errors && "text-red-500"
      }`}
      htmlFor={label}
    >
      <div>
        {label}
        {errors && (
          <span className="text-sm italic text-red-500">
            - {errors.message}
          </span>
        )}
      </div>
      <input
        className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
          errors ? "border-red-500 focus:ring-red-500" : " focus:ring-blue-500"
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
        className="border px-4 py-3"
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
  ...props
}: {
  label: string;
  name: Path<Fields>;
  options: readonly string[];
  register: UseFormRegister<Fields>;
} & HTMLProps<HTMLSelectElement>) => {
  return (
    <label className="mb-4 flex flex-col" htmlFor={props.id}>
      {label}
      <select
        className="border px-4 py-3"
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

type Fields = {
  firstName: string;
  lastName: string;
  resume: File;
  track: string;
  ethnicity: string;
  country: string;
  birthdate: Date;
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

const schema = z.object({
  firstName: z.string().nonempty("This field is required"),
  lastName: z.string().nonempty("This field is required"),
  resume: z.any(),
  track: z.array(z.enum(tracks)),
  ethnicity: z.enum(ethnicities),
  country: z.enum(countries),
  birthdate: z.coerce.date({
    errorMap: () => ({
      message: "This field is required",
    }),
  }),
  phoneNumber: z.string().nonempty("This field is required"),
  email: z.string().nonempty("This field is required").email("Invalid email"),
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

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  // Watch errors
  console.log(errors);

  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data);
  return (
    <div className="mx-auto mb-10 mt-28 w-full max-w-screen-md px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Welcome Hacker!</Header>
        <Input
          register={register}
          errors={errors.firstName}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <Input
          register={register}
          name="lastName"
          errors={errors.lastName}
          label="Last Name"
          placeholder="Last Name"
        />
        <ResumeUpload register={register} />
        <Header>About You</Header>
        <Select
          register={register}
          name="ethnicity"
          label="ethnicity"
          options={ethnicities}
        />
        <Select
          multiple
          register={register}
          name="track"
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
          errors={errors.birthdate}
          name="birthdate"
          label="Birthdate"
          type="date"
        />
        <Header>Contact</Header>
        <Input
          register={register}
          errors={errors.phoneNumber}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
        />
        <Input
          register={register}
          errors={errors.email}
          name="email"
          label="Email"
          placeholder="Email"
        />
        <Header>School</Header>
        <Select
          register={register}
          name="school"
          label="School"
          options={schools}
        />
        <Input
          register={register}
          errors={errors.major}
          name="major"
          label="Major"
          placeholder="Major"
        />
        <Select
          register={register}
          name="graduationYear"
          label="Graduation Year"
          options={graduationYears}
        />
        <Header>Hackathon</Header>
        <p className="mb-1">
          Is it okay if we share your information (name, resume, graduation
          year, etc.) with sponsors?
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
        <Header>External Links</Header>
        <div className="mb-2">
          Note: these are optional, but most technical applications ask for
          them! Make a Github/LinkedIn account today if you don’t have one.
        </div>
        <Input
          register={register}
          errors={errors.github}
          name="github"
          label="Github"
          placeholder="Github"
        />
        <Input
          register={register}
          errors={errors.linkedin}
          name="linkedin"
          label="LinkedIn"
          placeholder="LinkedIn"
        />
        <Header>Final Steps!</Header>
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
        <button className="mt-6 w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
