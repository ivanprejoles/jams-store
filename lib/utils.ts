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