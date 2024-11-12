"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { OrderColumn, PaymentColumn } from "./columns";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Coins, MoreHorizontal, ReceiptText, ZoomIn } from "lucide-react";
import {Button} from "@/components/ui/button";
import { usePaymentModal } from "@/hooks/use-payment-modal";
import { ImageModal } from "../../cart/components/image-modal";

interface CellActionProps {
    data: PaymentColumn;
}

export const ImageCellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const onDelete = async () => {
        if (loading) return
        try {
            setLoading(true);
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/payment/${data.id}`)
            router.refresh();
            toast.success("Payment Deleted.")
        } catch (error) {
            toast.error("Make sure to refresh and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        className="h-8 w-8 p-0"
                        variant='outline'
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem 
                        onClick={() => setIsImageOpen(true)}
                    >
                        <ZoomIn className="mr-2 h-4 w-4" />
                        Show Image
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        disabled={loading} 
                        onClick={() => onDelete()}>
                        <ReceiptText className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ImageModal
                isOpen={isImageOpen}
                onClose={() => setIsImageOpen(false)}
                image={data.imageSrc}
            />
        </>
    );
}