import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import toast from "react-hot-toast";

export type ProductWithQuantity = Product & {
  quantity: number;
  selectedColors: Record<string, string>; // Key-value pair for colors
};

interface CartStore {
  items: ProductWithQuantity[];
  addItem: (data: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemColors: (id: string, updatedColors: Record<string, string>) => void; // New method
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({
          items: [...get().items, { ...data, quantity: 1, selectedColors: {} }],
        });
        toast.success("Item added to cart.");
      },
      increaseQuantity: (id: string) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          return toast.error("Item not found in cart.");
        }

        // Increase the quantity of the found item
        currentItems[itemIndex].quantity += 1;

        set({ items: [...currentItems] });
        toast.success("Item quantity increased.");
      },
      decreaseQuantity: (id: string) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          return toast.error("Item not found in cart.");
        }

        // Decrease the quantity of the found item
        if (currentItems[itemIndex].quantity > 1) {
          currentItems[itemIndex].quantity -= 1;
          set({ items: [...currentItems] });
          toast.success("Item quantity decreased.");
        } else if (currentItems[itemIndex].quantity === 1) {
          // If quantity is 1, remove the item from cart
          set({ items: currentItems.filter((item) => item.id !== id) });
          toast.success("Item removed from the cart.");
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),

      // Update selected colors for a specific item
      updateItemColors: (id: string, updatedColors: Record<string, string>) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          return toast.error("Item not found in cart.");
        }

        // Update the selectedColors for the item
        currentItems[itemIndex].selectedColors = {
          ...currentItems[itemIndex].selectedColors,
          ...updatedColors,
        };

        set({ items: [...currentItems] });
        toast.success("Item colors updated.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
