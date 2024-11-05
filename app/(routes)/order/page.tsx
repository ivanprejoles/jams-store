import { format } from "date-fns";
import getOrders from '@/actions/get-orders'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'
import { formatter } from "@/lib/utils";

const OrderPage = async () => {
    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in');
    }

    const orders = await getOrders({userId})

    const formattedOrders: OrderColumn[] = orders.map((item: any) => ({
        id: item.id,
        email: item.email,
        name: item.name,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem: any) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total: any, item: any) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient data={formattedOrders} />
        </div>
    </div>
  )
}

export default OrderPage