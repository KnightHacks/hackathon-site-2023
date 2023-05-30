"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({});

type Fields = z.infer<typeof schema>;

export default function KnightHacksRegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = async (data) => {};

  return <form onSubmit={handleSubmit(onSubmit)}></form>;
}

// const ResumeUpload = ({
//   register,
//   ...props
// }: {
//   register: UseFormRegister<Fields>;
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   return (
//     <div className="mb-8 flex flex-col">
//       <label
//         className="flex w-min cursor-pointer flex-col whitespace-nowrap border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
//         tabIndex={0}
//         placeholder="Resume"
//         htmlFor="resume"
//       >
//         Upload Resume
//         <input
//           {...props}
//           {...register("resume", {
//             onChange: (e) => {
//               const file = e.target.files?.[0];
//               if (file) setFile(file);
//             },
//           })}
//           className="hidden"
//           id="resume"
//           type="file"
//         />
//       </label>
//       {file && <p>{file.name}</p>}
//     </div>
//   );
// };
