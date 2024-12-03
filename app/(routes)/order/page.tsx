import { format } from "date-fns";
import getOrders from "@/actions/get-orders";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { OrderClient } from "./components/client";
import { OrderColumn, PaymentColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrderPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await getOrders({ userId });

  const formattedOrders: OrderColumn[] = orders.map((item: any) => ({
    id: item.id,
    email: item.email,
    name: item.name,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem: any) => {
        const sizes = orderItem.sizes.join(", ");
        const colors = orderItem.colors.join(", ");
        return `${orderItem.product.name} (${orderItem.quantity}) [${sizes} | ${colors}]`;
      })
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total: any, item: any) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const allPaymentDetails: PaymentColumn[] = orders.flatMap((order: any) =>
    order.payments.map((payment: any) => ({
      id: payment.id,
      orderId: payment.orderId,
      phone: payment.phone,
      address: payment.address,
      products: order.orderItems
        .map((orderItem: any) => {
          const sizes = orderItem.sizes.join(", ");
          const colors = orderItem.colors.join(", ");
          return `${orderItem.product.name} (${orderItem.quantity}) [${sizes} | ${colors}]`;
        })
        .join(", "),
      email: payment.email,
      name: payment.name,
      date: format(payment.date, "MMM do, yyyy"),
      amount: formatter.format(Number(payment.amount)),
      imageSrc: payment.imageSrc,
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
    }))
  );

  return (
    <div className="dark:bg-black bg-white dark:bg-grid-small-orange/[0.2] bg-grid-small-rose-400/95 relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} payment={allPaymentDetails} />
      </div>
    </div>
  );
};

export default OrderPage;
