"use client";

import { Checkbox, Input, Select } from "@/components/form/Fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  countries,
  ethnicities,
  genders,
  graduationYears,
  shirtSizes,
  states,
} from "../register/options";
import { useState } from "react";
import { SuccessToast } from "@/components/Toast";

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
  graduationYear: z.enum(graduationYears),
  shareResume: z.boolean(),
});

type Fields = z.infer<typeof schema>;

export default function EditInfoForm({ user }: { user: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = useState(false)

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    // await fetch("/api/update_user", {
    //   method: "POST",
    //   body: JSON.stringify({ ...data, userId: user.id }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    setOpen(true)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SuccessToast open={open} setOpen={setOpen} />
      <div className="font-serif text-4xl font-bold">Dashboard</div>
      <p className="mb-4">
        Here you&apos;ll be able to edit your information and view your
        application status!
      </p>
      <div className="font-serif text-xl font-bold">Application Status</div>
      <p className="mb-4">
        {user.applications.length === 0 && "You have not applied :("}
      </p>
      <div className="mb-2 font-serif text-xl font-bold">Welcome Hacker</div>
      <Input
        label="First Name"
        placeholder="Eric"
        error={errors.firstName}
        {...register("firstName", {
          value: user.firstName,
        })}
      />
      <Input
        label="Last Name"
        placeholder="Farmer"
        error={errors.lastName}
        {...register("lastName", {
          value: user.lastName,
        })}
      />
      <div className="mb-2 font-serif text-xl font-bold">About You</div>
      <Input
        label="Age"
        placeholder="18"
        error={errors.age}
        {...register("age", {
          valueAsNumber: true,
          value: user.age,
        })}
      />
      <Select
        label="Shirt Size"
        error={errors.shirtSize}
        options={shirtSizes}
        {...register("shirtSize", {
          value: user.shirtSize,
        })}
      />
      <Select
        label="Gender"
        error={errors.gender}
        options={genders}
        {...register("gender", {
          value: user.gender ?? "Prefer not to say",
        })}
      />
      <Select
        label="Ethnicity"
        error={errors.ethnicity}
        options={ethnicities}
        {...register("ethnicity", {
          // @ts-ignore
          value: data.race,
        })}
      />
      <div className="mb-2 font-serif text-xl font-bold">Contact</div>
      <Input
        label="Email"
        placeholder="eric.farmer@knighthacks.org"
        error={errors.email}
        {...register("email", {
          value: user.email,
        })}
      />
      <Input
        label="Phone Number"
        placeholder="(123) 456-7890"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          value: user.phoneNumber,
        })}
      />
      <div className="mb-2 font-serif text-xl font-bold">Address</div>
      <Input
        label="Address Line 1"
        placeholder="4000 Central Florida Blvd"
        error={errors.addressLine1}
        {...register("addressLine1", {
          value: user.mailingAddress.addressLines[0],
        })}
      />
      <Input
        label="Address Line 2"
        placeholder="11200 SW 8th St"
        error={errors.addressLine2}
        {...register("addressLine2", {
          value: user.mailingAddress.addressLines[1],
        })}
      />
      <Select
        label="Country"
        error={errors.country}
        options={countries}
        {...register("country", {
          value: user.mailingAddress.country,
        })}
      />
      <Input
        label="City"
        placeholder="Orlando"
        error={errors.city}
        {...register("city", {
          value: user.mailingAddress.city,
        })}
      />
      <Select
        label="State"
        error={errors.state}
        options={states}
        {...register("state", {
          value: user.mailingAddress.state,
        })}
      />
      <Input
        label="Zip Code"
        placeholder="32816"
        error={errors.zipCode}
        {...register("zipCode", {
          value: user.mailingAddress.postalCode,
        })}
      />
      <div className="mb-2 font-serif text-xl font-bold">School</div>
      <Input
        label="School Name"
        placeholder="University of Central Florida"
        error={errors.schoolName}
        {...register("schoolName", {
          value: user.educationInfo.name,
        })}
      />
      <Input
        label="Major"
        placeholder="Computer Science"
        error={errors.major}
        {...register("major", {
          value: user.educationInfo.major,
        })}
      />
      <Select
        label="Graduation Year"
        error={errors.graduationYear}
        options={graduationYears}
        {...register("graduationYear")}
      />
      <div className="mb-2 font-serif text-xl font-bold">Other</div>
      <Checkbox
        label="I would like to share my resume with sponsors"
        error={errors.shareResume}
        {...register("shareResume", {
          value: user.shareResume,
        })}
      />
      <button className="mt-6 w-full border border-black bg-black px-4 py-3 text-center font-bold text-white">
        Submit
      </button>
    </form>
  );
}
