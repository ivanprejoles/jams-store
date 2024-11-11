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
    const {onOpen} = usePaymentModal()

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
                        onClick={() => onOpen({email: data.email, name: data.name, orderId: data.id, address: data.address, phone: data.phone})}>
                        <Coins className="mr-2 h-4 w-4" />
                        Payment
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}