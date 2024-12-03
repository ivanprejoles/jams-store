import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart, { ProductWithQuantity } from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: ProductWithQuantity;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    const foundItem = cart.items.find((item) => item.id === data.id);
    if (foundItem?.quantity && foundItem?.quantity > 1) {
      cart.decreaseQuantity(data.id);
    } else {
      cart.removeItem(data.id);
    }
  };

  // Ensure selectedColors is initialized
  // const selectedColors = data.

  // Handle color change and update the color in the selectedColors object
  const handleColorChange = (colorKey: string, color: string) => {
    const foundItem = cart.items.find((item) => item.id === data.id);
    if (foundItem) {
      const updatedColors = { ...foundItem.selectedColors, [colorKey]: color };

      // Update the cart with the new selectedColors
      cart.updateItemColors(foundItem.id, updatedColors);
    }
  };
  // Handle color change and update the color in the selectedColors object
  const handleSizeChange = (sizeKey: string, size: string) => {
    const foundItem = cart.items.find((item) => item.id === data.id);
    if (foundItem) {
      const updatedSizes = { ...foundItem.selectedSizes, [sizeKey]: size };

      // Update the cart with the new selectedColors
      cart.updateItemSizes(foundItem.id, updatedSizes);
    }
  };

  return (
    <>
      {Array.from({ length: data.quantity }).map((_, index) => (
        <li
          key={index}
          className="flex py-6 border-b backdrop-blur-sm bg-slate-100/5 dark:bg-white/5 rounded-xl border-slate-600/40 dark:border-white/40 border p-3"
        >
          <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 border border-white">
            <Image
              fill
              src={data.images?.[0]?.url || "/path/to/placeholder.jpg"}
              alt=""
              className="object-cover object-center"
            />
          </div>
          <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="absolute z-10 right-0 top-0">
              <IconButton
                onClick={onRemove}
                icon={<X size={15} className="dark:text-white" />}
              />
            </div>
            <div className="relative pr-9 gap-4 sm:grid grid-cols-1 sm:gap-x-6 sm:pr-0">
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-black dark:text-white">
                  {data.name}
                </p>
              </div>
              <div className="mt-1 flex text-sm gap-4">
                <Select
                  value={cart.items.find((item) => item.id === data.id)?.colors[0].name}
                  onValueChange={(color) =>
                    handleColorChange(`color${index + 1}`, color)
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                  {cart.items.find((item) => item.id === data.id)?.colors?.map((color, key) => (
                      <SelectItem key={key} value={color.name}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={cart.items.find((item) => item.id === data.id)?.sizes[0].name}
                  onValueChange={(size) =>
                    handleSizeChange(`size${index + 1}`, size)
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="SIze" />
                  </SelectTrigger>
                  <SelectContent>
                  {cart.items.find((item) => item.id === data.id)?.sizes?.map((size, key) => (
                      <SelectItem key={key} value={size.name}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Currency value={data.price} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default CartItem;
