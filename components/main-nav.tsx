"use client";

import Link from "next/link";
import { useMediaQuery } from 'react-responsive';
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation";
interface MainNavProps {
    data?: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
    data = []
}) => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname(); // Use usePathname to get the current path
    const [id, setId] = useState('');

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (typeof pathname === "string") {
            const idFromPath = pathname.split('/').pop(); // Extract the ID from the path
            
            if (idFromPath) {
                setId(idFromPath); // Only set the ID if we extracted a non-empty string
            }
        }
    }, [pathname]);

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }));

    if (!isMounted) {
        return null
    }

    return (
    <nav className="mx-2 md:mx-6 flex items-center">
      {isMobile ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {(id && data)
                ? data.find((route) => route.id === id)?.name || 'Select page...'
                : "Select page..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-fuchsia-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Store..." />
              <CommandEmpty>No page found.</CommandEmpty>
              <CommandList>
                {routes.map((route, key) => (
                    <CommandItem
                        className="cursor-pointer"
                        key={key}
                    >
                        <Link
                            href={route.href}
                            className="flex text-fuchsia-600"
                        >
                            <Check  
                            className={cn(
                                "mr-2 h-4 w-4 ",
                                route.active ? "opacity-100" : "opacity-0"
                            )}
                            />
                            <span className="flex-1 ">{route.label}</span>
                        </Link>
                        </CommandItem>
                    ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors bg-clip-text hover:text-transparent hover:bg-no-repeat hover:bg-gradient-to-r hover:from-purple-500 hover:via-violet-500 hover:to-pink-500",
                route.active ? "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
 
export default MainNav;