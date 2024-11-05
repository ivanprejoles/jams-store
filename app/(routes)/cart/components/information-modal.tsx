'use client'

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Modal } from "@/components/ui/info-modal"
import {Button} from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  contactNumber: z.string().min(1, {
    message: "Contact number is required.",
  }),
})

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: z.infer<typeof formSchema>) => void
  loading: boolean
}

export const InfosModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      contactNumber: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm(values)
  }

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="Confirm Action"
      description="Please fill in the following information to proceed. This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (Location)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your contact number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button type="button" disabled={loading} onClick={onClose} className="bg-white text-black">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="text-red-500 bg-white">
              {loading ? "Processing..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}