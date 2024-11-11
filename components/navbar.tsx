import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import Image from "next/image";
export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <div className="border-b sticky top-0 left-0 z-30 backdrop-blur-sm bg-slate-100/5 dark:bg-white/5 border-slate-600/40 dark:border-white/40">
            <Container>
                <div className="relative px-0 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <Image
                            alt="logo"
                            src='/streetheus-logo.png'
                            width={100}
                            height={30}
                        />
                        <p className="font-bold hidden md:block text-xl relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">STORE</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
}
 
export default Navbar;