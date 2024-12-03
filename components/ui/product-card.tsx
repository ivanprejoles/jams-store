"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import {
  Expand,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Product, SalesStatus } from "@/types";
import { Badge } from "./badge";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { BackgroundGradient } from "./background-gradient";
import { GradientBuyBadge } from "./gradient-buy-badge";
import BestProductRibbon from "./popular-stamp";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation(); // Prevents triggering parent handlers
    cart.addItem(data); // Add item to the cart
  };

  const onDecreaseQuantity: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default behavior for this event
    cart.decreaseQuantity(data.id); // Decrease item quantity in the cart
  };

  const onIncreaseQuantity: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default behavior for this event
    cart.increaseQuantity(data.id); // Increase item quantity in the cart
  };

  const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default behavior for this event
    cart.removeItem(data.id); // Remove item from the cart
  };

  return (
    <div
      onClick={handleClick}
      className="backdrop-blur-sm bg-slate-100/5 dark:bg-white/5 group cursor-pointer rounded-[25px] border-slate-600/40 dark:border-white/40 border"
    >
      <BackgroundGradient
        containerClassName="w-full h-full"
        className="rounded-[22px] w-full h-full p-3 bg-white dark:bg-zinc-900"
      >
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={data?.images?.[0]?.url}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-md"
          />
          {data.salesStatus.toString() === SalesStatus[1] && (
            <BestProductRibbon />
          )}
          <div
            className={cn(
              "opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5",
              cart.items.find((item) => item.id === data.id) && ""
            )}
          >
            <div
              className={cn(
                "flex gap-x-6 justify-center",
                cart.items.find((item) => item.id === data.id) && "gap-x-2"
              )}
            >
              <IconButton
                onClick={onPreview}
                icon={
                  <Expand
                    size={20}
                    className="text-gray-600 border-gray-200 dark:border-gray-100 dark:text-white"
                  />
                }
              />
              {cart.items.find((item) => item.id === data.id) ? (
                <>
                  <IconButton
                    onClick={onDecreaseQuantity} // Decrease quantity
                    icon={
                      <MinusCircle
                        size={20}
                        className="text-gray-600 dark:text-white"
                      />
                    }
                  />

                  <span className="px-2 text-lg rounded-full flex items-center justify-center bg-white dark:bg-[#020817] dark:text-white border dark:border-white shadow-md hover:scale-110 transition">
                    {cart.items.find((item) => item.id === data.id)?.quantity}
                  </span>

                  <IconButton
                    onClick={onIncreaseQuantity} // Increase quantity
                    icon={
                      <PlusCircle
                        size={20}
                        className="text-gray-600 dark:text-white"
                      />
                    }
                  />

                  <IconButton
                    onClick={onRemoveFromCart} // Remove from cart
                    icon={
                      <Trash
                        size={20}
                        className="text-gray-600 dark:text-white"
                      />
                    }
                  />
                </>
              ) : (
                <IconButton
                  onClick={onAddToCart} // Add to cart
                  icon={
                    <ShoppingCart
                      size={20}
                      className="text-gray-600 dark:text-white"
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-sm text-gray-500">{data.category?.name}</p>
        </div>
        <GradientBuyBadge price={data.price} isOutOfStock={data.stock <= 0} />
      </BackgroundGradient>
    </div>
  );
};

export default ProductCard;
