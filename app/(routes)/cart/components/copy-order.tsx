'use client'

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Modal } from "@/components/ui/info-modal"
import {Button} from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { exportedData } from "./summary"
import { Clipboard } from "lucide-react"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data: string
}

export const CopyModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="Copy Information"
      description="Information has been copied successfully. You can copy it again if needed."
      isOpen={isOpen}
      onClose={onClose}
    >
        <div className="w-full h-auto flex gap-2">
        <div className="flex-1 h-auto rounded-[6px] ring-offset-background border border-input p-2">
            {data}
        </div>
        <Button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground [&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5"
            onClick={onConfirm}
        >
            <Clipboard className="h-3.5 w-3.5 text-gray-500" />
        </Button>
        </div>
    </Modal>
  )
}