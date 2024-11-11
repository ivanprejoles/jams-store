"use client";

import {Button} from "@/components/ui/button";
import { Button as MovingButton } from "./ui/moving-border";
import useCart from "@/hooks/use-cart";
import { Menu, ShoppingBag, TableProperties, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./dark-mode";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-0 md:ml-auto flex items-center gap-x-1 md:gap-x-4 md:pr-2">
            <div className="lg:hidden flex items-center gap-x-1">
            <ModeToggle />
            {/* Mobile Menu */}
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                    {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/cart")}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Cart ({cart.items.length})
                    </DropdownMenuItem>
                    <SignedIn>
                    <DropdownMenuItem onClick={() => router.push("/order")}>
                        <TableProperties className="mr-2 h-4 w-4" />
                        Orders
                    </DropdownMenuItem>
                    </SignedIn>
                    <SignedOut>
                    <DropdownMenuItem asChild>
                        <SignInButton mode="modal">
                        Sign In
                        </SignInButton>
                    </DropdownMenuItem>
                    </SignedOut>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

      {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-x-4">
                <ModeToggle />
                <button onClick={() => router.push("/cart")} className="p-[3px] relative flex items-center gap-x-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    <div className="px-8 py-2 bg-white dark:bg-[#020817] flex items-center  rounded-full  relative group transition duration-200 text-white hover:bg-transparent dark:hover:bg-transparent group">
                        <ShoppingBag
                            size={20}
                            className="text-[#020817] group-hover:text-white dark:text-white"
                        />
                        <span className="ml-2 text-sm font-medium text-[#020817] group-hover:text-white dark:text-white">
                            {cart.items.length}
                        </span>
                    </div>
                </button>
                <SignedIn>
                    <button onClick={() => router.push("/order")} className="p-[3px] relative flex items-center gap-x-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        <div className="px-8 py-2 bg-white dark:bg-[#020817] flex items-center  rounded-full  relative group transition duration-200 text-white hover:bg-transparent dark:hover:bg-transparent group">
                            <TableProperties
                                size={20}
                                className="text-[#020817] group-hover:text-white dark:text-white"
                            />
                        </div>
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Sign In
                    </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    );
}
 
export default NavbarActions;