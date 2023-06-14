"use client";

import * as T from "@radix-ui/react-toast";

export const Toast = ({
  open,
  setOpen,
  title,
  description,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
}) => {
  return (
    <T.Provider>
      <T.Root
        open={open}
        onOpenChange={setOpen}
        className="border bg-white p-3 shadow-lg"
      >
        <T.Title className="text-xl font-serif font-bold ">{title}</T.Title>
        <T.Description>{description}</T.Description>
      </T.Root>
      <T.Viewport className="fixed bottom-0 right-0 w-[400px] p-6" />
    </T.Provider>
  );
};
