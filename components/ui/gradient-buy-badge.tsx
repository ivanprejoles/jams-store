import React from "react";
import { Badge } from "@/components/ui/badge";
import Currency from "@/components/ui/currency";
import { cn } from "@/lib/utils";

interface GradientBuyBadgeProps {
  price: number;
  isOutOfStock: boolean;
}

export function GradientBuyBadge({
  price,
  isOutOfStock,
}: GradientBuyBadgeProps) {
  return (
    <Badge
      className={cn(
        " text-xs font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
        isOutOfStock
          ? "bg-black text-white"
          : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white hover:shadow-xl cursor-pointer"
      )}
    >
      <span className="mr-1">{isOutOfStock ? "Out of Stock" : "Buy now"}</span>
      <span
        className={cn(
          "bg-white bg-opacity-20 rounded-full px-1 text-xs",
          isOutOfStock ? "bg-gray-500 bg-opacity-20" : "bg-white bg-opacity-20"
        )}
      >
        <Currency value={price} />
      </span>
    </Badge>
  );
}
