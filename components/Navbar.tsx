"use client";

import { useState } from "react";
import Link from "next/link";

// ui lib
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// icons
import { Menu, ChevronDown, ChevronUp } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceItems = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Apps", href: "/services/mobile-apps" },
    { name: "UI/UX Design", href: "/services/ui-ux-design" },
  ];

  return (
    <nav className="bg-background shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center text-primary">
              <svg
                className="mr-2 h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12,2 2,22 22,22" />
              </svg>
              <span className="text-xl font-bold">SMK Negeri 1</span>
              <span className="sr-only">Company Logo and Name</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                >
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="w-full">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-4 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                      onClick={toggleServices}
                    >
                      Services{" "}
                      {isServicesOpen ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                    {isServicesOpen && (
                      <div className="mt-2 space-y-2 pl-4">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                            onClick={toggleMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
