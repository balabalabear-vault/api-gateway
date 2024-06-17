'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function NavBar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = useMemo(() => ([
        {
            name: "Profile",
            url: "/",
        },
        {
            name: "Trips",
            url: "/trips",
        }
    ]), []);

    return (
        <Navbar
            isBordered
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">Jack Kwok</p>
                </NavbarBrand>
            </NavbarContent>


            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    menuItems.map((item) => (
                        <NavbarItem key={item.name} isActive={pathname === item.url}>
                            <Link color="foreground" href={item.url}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}`} isActive={pathname === item.url}>
                        <Link
                            className="w-full"
                            href={item.url}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
