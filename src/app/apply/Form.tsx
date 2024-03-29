"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldError,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Checkbox, TextArea } from "../../components/Fields";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlockBlobClient } from "@azure/storage-blob";
import { convertFileToArrayBuffer } from "@/utils";

const applySchema = z.object({
  whyAttend: z.string().nonempty("This field is required"),
  whatLearn: z.string().nonempty("This field is required"),
  shareInfo: z.boolean(),
  resume: z
    .custom<FileList>()
    .refine((files) => {
      if (files.length > 1) return false;
      if (files.length < 1) return true;
      const file = files[0];
      return file.type === "application/pdf";
    }, "File must be a PDF")
    .optional(),
});

export type ApplicationFields = z.infer<typeof applySchema>;

export default function KnightHacksRegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFields>({
    resolver: zodResolver(applySchema),
  });

  console.log(errors)

  const uploadResume = async (url: string, file: File) => {
    convertFileToArrayBuffer(file).then((fileArrayBuffer) => {
      if (
        fileArrayBuffer === null ||
        fileArrayBuffer.byteLength < 1 ||
        fileArrayBuffer.byteLength > 256000
      )
        return;

      const blockBlobClient = new BlockBlobClient(url);
      return blockBlobClient.uploadData(fileArrayBuffer);
    });
  };

  const onSubmit: SubmitHandler<ApplicationFields> = async (data) => {
    console.log(data);

    const res = await fetch("/api/apply", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const { applyToHackathon: sasURL } = await res.json();

      console.log(sasURL);
      console.log(data.resume);

      if (data.resume) uploadResume(sasURL, data.resume[0]);

      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-serif text-4xl font-bold">Apply!</div>
      <p className="mb-4">
        October 6-8 | UCF Main Campus | Open to all students
      </p>
      <TextArea
        label="Why do you want to attend KnightHacks?"
        placeholder="I love hackathons because..."
        error={errors.whyAttend}
        {...register("whyAttend")}
      />
      <TextArea
        label="What do you hope to learn?"
        placeholder="I want to learn about..."
        error={errors.whatLearn}
        {...register("whatLearn")}
      />
      <ResumeUpload error={errors.resume} register={register} />
      <Checkbox
        label="I would like to share my information with sponsors"
        error={errors.shareInfo}
        {...register("shareInfo")}
      />
      <button
        type="submit"
        className="mt-6 w-full border border-black bg-black px-4 py-3 text-center font-bold text-white"
      >
        Submit
      </button>
    </form>
  );
}

const ResumeUpload = ({
  register,
  error,
  ...props
}: {
  error: FieldError | undefined;
  register: UseFormRegister<ApplicationFields>;
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
              const file: File = e.target.files[0];
              if (file) setFile(file);
            },
          })}
          className="hidden"
          id="resume"
          type="file"
        />
      </label>
      {error ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        file && <p>{file.name}</p>
      )}
    </div>
  );
};
