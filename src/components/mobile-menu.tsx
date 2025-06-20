'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { SheetUi } from "@/components/ui/index";
import logotipo from "../../public/images/lox-logo.svg";

export default function MobileMenu() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handScroll = () => {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", handScroll);
        return () => window.removeEventListener("scroll", handScroll);
    }, []);


    return (
        <div
            className={`
                fixed md:hidden top-0 z-50 w-full px-[5%] py-4 flex justify-between
                transition-all duration-300
                ${scrolled ? "backdrop-blur-lg bg-black/40 shadow-md" : "bg-transparent"}
            `}
        >
            <div>
                <Link href="/" className="md:hidden">
                    <Image
                        src={logotipo.src}
                        alt="Universidade lusíadas"
                        width={60}
                        height={60}
                    />
                </Link>
            </div>

            <SheetUi.Sheet>
                <SheetUi.SheetTrigger className="px-4 rounded-xs text-neutral-900 bg-neutral-100">
                    <Menu />
                </SheetUi.SheetTrigger>
                <SheetUi.SheetContent>
                    <SheetUi.SheetHeader>
                        <SheetUi.SheetTitle className="sr-only">Menu</SheetUi.SheetTitle>
                    </SheetUi.SheetHeader>

                    <nav className="font-mono font-normal flex flex-col space-y-2 mt-4 text-sm text-black px-4">
                        <span className="font-sans text-base font-semibold">Guias</span>
                        <Link href="#" className="relative p-2">Downloads</Link>
                        <Link href="/Services" className="p-2">Help</Link>
                        <Link href="/StudyAbroad" className="p-2">About dsLean</Link>
                        <Link href="/HowWorks" className="p-2">Signup</Link>
                    </nav>
                </SheetUi.SheetContent>
            </SheetUi.Sheet>
        </div>
    );

}