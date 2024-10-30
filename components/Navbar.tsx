"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center justify-center"
            >
              <Image
                src="/Next.js.png"
                width={100}
                height={50}
                alt="next js logo"
              />
              <span className="text-2xl font-bold text-foreground">
                SMK Negeri 1
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Profil <ChevronDown className="ml-1 inline-block h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/profil/visiMisi"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Visi Dan Misi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/profil/facility"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Fasilitas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/profil/history"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Sejarah
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Artikel <ChevronDown className="ml-1 inline-block h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/article/berita"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Berita
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/article/pengumuman"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Pengumuman
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/article/agenda"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Agenda
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Kontak
              </Link>
              <ModeToggle />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-foreground hover:text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
            >
              Home
            </Link>
            <div className="space-y-1">
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                onClick={(e) =>
                  e.currentTarget.nextElementSibling?.classList.toggle("hidden")
                }
              >
                Profil <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </button>
              <div className="hidden pl-4">
                <Link
                  href="/profil/visiMisi"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Visi dan Misi
                </Link>
                <Link
                  href="/profil/facility"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Fasilitas
                </Link>
                <Link
                  href="/profil/history"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Sejarah
                </Link>
              </div>
            </div>
            <div className="space-y-1">
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                onClick={(e) =>
                  e.currentTarget.nextElementSibling?.classList.toggle("hidden")
                }
              >
                Artikel <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </button>
              <div className="hidden pl-4">
                <Link
                  href="/article/berita"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Berita
                </Link>
                <Link
                  href="/article/pengumuman"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Pengumuman
                </Link>
                <Link
                  href="/article/agenda"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
                >
                  Agenda
                </Link>
              </div>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary transition-all hover:bg-muted hover:text-primary"
            >
              Kontak
            </Link>
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
