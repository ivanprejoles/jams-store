import { OrderProduct } from "@/app/(routes)/order/components/columns";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // To show in 12-hour format with AM/PM
  });
}
export const formatDateStamp = (isoString: Date) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long", // Use "short" for abbreviated month
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function truncateText(text: unknown, maxLength: number = 30): string {
  const stringText = typeof text === 'string' ? text : String(text || '');
  return stringText.length > maxLength ? stringText.slice(0, maxLength) + '' : stringText;
}

export const formatProducts = (orderItems: OrderProduct[]) => {
  // Map products with their sizes, colors, and quantities properly formatted
  const formattedWithBr = orderItems
    .map((orderItem, index) => {
      const sizes = orderItem.sizes.join(", ");
      const colors = orderItem.colors.join(", ");
      return `${index + 1}. ${orderItem.name}<br />   <b>Quantity:</b> ${orderItem.quantity}<br />   <b>Sizes:</b> ${sizes}<br />   <b>Colors:</b> ${colors}`;
    })
    .filter(Boolean)
    .join("<br /><br />");

  const formattedWithoutBr = orderItems
    .map((orderItem, index) => {
      const sizes = orderItem.sizes.join(", ");
      const colors = orderItem.colors.join(", ");
      return `${index + 1}. ${orderItem.name}   Quantity: ${orderItem.quantity}   Sizes: ${sizes}   Colors: ${colors}`;
    })
    .filter(Boolean)
    .join("\n");

  // Return formatted data
  return {
    formattedWithBr, 
    formattedWithoutBr,
  };
};