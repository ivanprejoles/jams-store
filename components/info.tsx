"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const productInCart = cart.items.find((item) => item.id === data.id);
  const quantity = productInCart?.quantity || 0;

  const onAddToCart = () => {
    cart.addItem(data);
  };

  const onRemoveFromCart = () => {
    cart.removeItem(data.id); // Assuming `id` is the unique identifier for the product
  };

  const onIncreaseQuantity = () => {
    cart.increaseQuantity(data.id); // Increment by 1
  };

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      cart.decreaseQuantity(data.id); // Decrement by 1
    } else {
      onRemoveFromCart(); // Remove if quantity becomes 0
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        {data.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900 dark:text-gray-100">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {/* Sizes */}
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-black dark:text-white">Sizes:</h3>
          <div className="flex flex-wrap gap-2">
            {data?.sizes?.map((size, index) => (
              <div
                key={index}
                className="flex items-center gap-x-2 px-2 py-1 border border-orange-500 rounded-md"
              >
                <span className="text-sm font-medium">{size.name}</span>
                <span className="text-sm ">({size.value})</span>
              </div>
            ))}
          </div>
        </div>
        {/* Colors */}
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-black dark:text-white">Colors:</h3>
          <div className="flex flex-wrap items-center gap-4">
            {data?.colors?.map((color, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <div
                  className="h-6 w-6 rounded-full border border-orange-500"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quantity Controls */}
      <div className="mt-10 flex items-center gap-x-4">
        {quantity > 0 ? (
          <div className="flex items-center gap-x-4">
            <IconButton
              onClick={onDecreaseQuantity}
              icon={<Minus size={20} className="text-gray-600 dark:text-white" />}
            />
            <span className="text-lg font-medium text-black dark:text-white">
              {quantity}
            </span>
            <IconButton
              onClick={onIncreaseQuantity}
              icon={<Plus size={20} className="text-gray-600 dark:text-white" />}
            />
            <IconButton
              onClick={onRemoveFromCart}
              icon={<Trash2 size={20} className="text-red-500" />}
            />
          </div>
        ) : (
          <IconButton
            onClick={onAddToCart}
            icon={
              <ShoppingCart size={20} className="text-gray-600 dark:text-white" />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Info;
