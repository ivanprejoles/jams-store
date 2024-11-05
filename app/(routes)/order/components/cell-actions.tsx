"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { OrderColumn } from "./columns";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Coins, MoreHorizontal, ReceiptText } from "lucide-react";
import {Button} from "@/components/ui/button";
import { usePaymentModal } from "@/hooks/use-payment-modal";

interface CellActionProps {
    data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    const {onOpen} = usePaymentModal()
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPaid = async () => {
        try {
            setLoading(true);
            await axios.patch(`/api/${params.storeId}/orders/${data.id}`)
            router.refresh();
            toast.success("Billboard deleted.")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.");
        } finally {
            setLoading(false);
            // setOpen(false);
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
                        onClick={() => onOpen({email: data.email, name: data.name, orderId: data.id})}>
                        <Coins className="mr-2 h-4 w-4" />
                        Payment
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => onPaid()}>
                        <ReceiptText className="mr-2 h-4 w-4" />
                        Receipt
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}