"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  countries,
  ethnicities,
  genders,
  graduationYears,
  shirtSizes,
  states,
} from "../../constants";
import { Select, Checkbox, Input } from "../../components/Fields";

const schema = z.object({
  firstName: z.string().nonempty("This field is required"),
  lastName: z.string().nonempty("This field is required"),
  age: z
    .number({
      errorMap: () => ({ message: "This field is required" }),
    })
    .int("Age must be a positive integer")
    .positive("Age must be a positive integer")
    .min(18, "You must be 18 or older"),
  gender: z.enum(genders),
  shirtSize: z.enum(shirtSizes),
  ethnicity: z.enum(ethnicities),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().nonempty("This field is required"),
  country: z.enum(countries),
  addressLine1: z.string().nonempty("This field is required"),
  addressLine2: z.string().optional(),
  city: z.string().nonempty("This field is required"),
  state: z.enum(states),
  zipCode: z.string().nonempty("This field is required"),
  schoolName: z.string().nonempty("This field is required"),
  major: z.string().nonempty("This field is required"),
  graduationDate: z.string().datetime(),
  shareResume: z.boolean(),
  agreesToMLHCodeOfConduct: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the MLH Code of Conduct" }),
  }),
  isFirstTimeHacker: z.boolean(),
  isDoingCybersecurityTrack: z.boolean(),
});

export type RegistrationFields = z.infer<typeof schema>;

export default function KnightHacksAccountRegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegistrationFields> = async (data) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-serif text-4xl font-bold">Register</div>
      <p className="mb-4">
        Create a KnightHacks account once and use it for all KnightHacks
        hackathons!
      </p>
      <div className="mb-2 font-serif text-xl font-bold">Welcome Hacker</div>
      <Input
        label="First Name"
        placeholder="Eric"
        error={errors.firstName}
        {...register("firstName")}
      />
      <Input
        label="Last Name"
        placeholder="Farmer"
        error={errors.lastName}
        {...register("lastName")}
      />
      <Checkbox
        label="Are you a first time hacker?"
        error={errors.isFirstTimeHacker}
        {...register("isFirstTimeHacker")}
      />
      <Checkbox
        label="Are you interested in participating in our cybersecurity track?"
        error={errors.isDoingCybersecurityTrack}
        {...register("isDoingCybersecurityTrack")}
      />
      <div className="mb-2 font-serif text-xl font-bold">About You</div>
      <Input
        label="Age"
        placeholder="18"
        error={errors.age}
        {...register("age", {
          valueAsNumber: true,
        })}
      />
      <Select
        label="Shirt Size"
        error={errors.shirtSize}
        options={shirtSizes}
        {...register("shirtSize")}
      />
      <Select
        label="Gender"
        error={errors.gender}
        options={genders}
        {...register("gender")}
      />
      <Select
        label="Ethnicity"
        error={errors.ethnicity}
        options={ethnicities}
        {...register("ethnicity")}
      />
      <div className="mb-2 font-serif text-xl font-bold">Contact</div>
      <Input
        label="Email"
        placeholder="eric.farmer@knighthacks.org"
        error={errors.email}
        {...register("email")}
      />
      <Input
        label="Phone Number"
        placeholder="(123) 456-7890"
        error={errors.phoneNumber}
        {...register("phoneNumber")}
      />
      <div className="mb-2 font-serif text-xl font-bold">Address</div>
      <Input
        label="Address Line 1"
        placeholder="4000 Central Florida Blvd"
        error={errors.addressLine1}
        {...register("addressLine1")}
      />
      <Input
        label="Address Line 2"
        placeholder="11200 SW 8th St"
        error={errors.addressLine2}
        {...register("addressLine2")}
      />
      <Select
        label="Country"
        error={errors.country}
        options={countries}
        {...register("country")}
      />
      <Input
        label="City"
        placeholder="Orlando"
        error={errors.city}
        {...register("city")}
      />
      <Select
        label="State"
        error={errors.state}
        options={states}
        {...register("state")}
      />
      <Input
        label="Zip Code"
        placeholder="32816"
        error={errors.zipCode}
        {...register("zipCode")}
      />
      <div className="mb-2 font-serif text-xl font-bold">School</div>
      <Input
        label="School Name"
        placeholder="University of Central Florida"
        error={errors.schoolName}
        {...register("schoolName")}
      />
      <Input
        label="Major"
        type="date"
        placeholder="Computer Science"
        error={errors.major}
        {...register("major")}
      />
      <Input
        type="date"
        label="Graduation Date"
        error={errors.graduationDate}
        {...register("graduationDate")}
      />

      <div className="mb-2 font-serif text-xl font-bold">Other</div>
      <Checkbox
        label="I would like to share my resume with sponsors"
        error={errors.shareResume}
        {...register("shareResume")}
      />
      <Checkbox
        label="I agree to the MLH Code of Conduct"
        error={errors.agreesToMLHCodeOfConduct}
        {...register("agreesToMLHCodeOfConduct")}
      />
      <button className="mt-6 w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
        Submit
      </button>
    </form>
  );
}
