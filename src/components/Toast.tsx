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
        className="border bg-white p-2 shadow-lg data-[state=closed]:animate-toast-hide data-[state=open]:animate-toast-show"
      >
        <T.Title className="font-serif text-xl font-bold ">{title}</T.Title>
        <T.Description>{description}</T.Description>
      </T.Root>
      <T.Viewport className="fixed bottom-0 right-0 w-[400px] p-6" />
    </T.Provider>
  );
};
