"use client"

import * as Toast from "@radix-ui/react-toast"
import { useEffect } from "react"

export const SuccessToast = ({ open, setOpen }: {
  open: boolean,
  setOpen: (open: boolean) => void
}) => {

  useEffect(() => {

  }, [])

  return (
    <Toast.Provider>
      <Toast.Root open={open} onOpenChange={setOpen} className="bg-white border p-2">
        <Toast.Title className="text-sxl font-bold font-serif ">Lorem Ipsum</Toast.Title>
        <Toast.Description >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 w-[400px] p-6" />
    </Toast.Provider>
  )
}