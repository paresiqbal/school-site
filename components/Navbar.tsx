"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center text-primary">
              <svg
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <span className="text-xl font-bold">Company Name</span>
              <span className="sr-only">Company Logo and Name</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
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
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium justify-start w-full"
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
                      <div className="pl-4 mt-2 space-y-2">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
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
