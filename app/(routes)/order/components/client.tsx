"use client"

import { OrderColumn, PaymentColumn, columns, paymentColumns } from './columns'

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
    data: OrderColumn[],
    payment: PaymentColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data,
    payment
}) => {
    return (    
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Monitor your orders."
            />
            <Separator className="bg-fuchsia-500" />
            <DataTable columns={columns} data={data} searchKey="products" />
            
            <Heading
                title={`Payment Confirmation (${payment.length})`}
                description="Monitor your payment confirmation:."
            />
            <Separator className="bg-fuchsia-500" />
            <DataTable columns={paymentColumns} data={payment} searchKey="products" />
        </>
    )
}