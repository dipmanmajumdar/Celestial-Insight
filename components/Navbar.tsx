"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Rocket, Satellite, Telescope, Info, Mail, LayoutDashboard } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Rocket },
    { name: "Blogs", href: "/blogs", icon: Telescope },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 glass rounded-full flex items-center gap-6 md:gap-8 transition-all duration-300 hover:scale-105">
            <Link href="/" className="flex items-center gap-2 group">
                <Satellite className="w-6 h-6 text-primary animate-pulse" />
                <span className="font-bold text-lg hidden md:block tracking-tighter">CELESTIAL</span>
            </Link>

            <div className="flex items-center gap-4 md:gap-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary",
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
