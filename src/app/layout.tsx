"use client";

import { usePathname } from "next/navigation";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import MenuManager from "@/components/menu-manager";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const interMono = Inter({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

{/*export const metadata: Metadata = {
    title: "LOX | Gerencie eventos de forma eficaz",
    description: "Sistema de gerenciamento de eventos universitários",
    icons: "/images/lox-favicon.svg",
};*/}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();
    const noHeaderFooter = ["/login", "/signup", "/reset-password", "/dashboard", "/portal"];
    const hideHeaderFooter = noHeaderFooter.includes(pathname);

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${interMono.variable} antialiased`}>
                {!hideHeaderFooter && (
                    <MenuManager />
                )}
                <Toaster />
                {children}
            </body>
        </html>
    );
}
