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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdownName: string | null) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background font-[family-name:var(--font-geist-sans)] shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center justify-center"
            >
              <Image
                src="/blud.png"
                width={40}
                height={40}
                alt="next js logo"
                style={{ width: "auto", height: "auto" }}
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
                  Jurusan <ChevronDown className="ml-1 inline-block h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/major/tkj"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Komputer & Jaringan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/tbsm"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Bisnis Sepeda Motor
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/tkr"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Kendaraan Ringan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/tei"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Elektronika
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/dpib"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Desain Permodelan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/titl"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Instalasti Tenaga Listrik
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/major/las"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Pengelasan
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
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Panduan <ChevronDown className="ml-1 inline-block h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="/guide/registration"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Pendaftaran
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/guide/school-fee"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Biaya Sekolah
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/guide/calendar-academic"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Kalender Akademik
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/guide/faq"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/guide/download"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Download
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
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
            onClick={handleLinkClick}
          >
            Home
          </Link>

          {/* Dropdown for Profil */}
          <div>
            <button
              onClick={() => handleDropdownToggle("profil")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            >
              Profil <ChevronDown className="ml-1 inline-block h-4 w-4" />
            </button>
            {openDropdown === "profil" && (
              <div className="space-y-1 pl-4">
                <Link
                  href="/profil/visiMisi"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Visi dan Misi
                </Link>
                <Link
                  href="/profil/facility"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Fasilitas
                </Link>
                <Link
                  href="/profil/history"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Sejarah
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Jurusan */}
          <div>
            <button
              onClick={() => handleDropdownToggle("jurusan")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            >
              Jurusan <ChevronDown className="ml-1 inline-block h-4 w-4" />
            </button>
            {openDropdown === "jurusan" && (
              <div className="space-y-1 pl-4">
                <Link
                  href="/major/tkj"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Komputer & Jaringan
                </Link>
                <Link
                  href="/major/tbsm"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Bisnis Sepeda Motor
                </Link>
                <Link
                  href="/major/tkr"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Kendaraan Ringan
                </Link>
                <Link
                  href="/major/tei"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Elektronika
                </Link>
                <Link
                  href="/major/dpib"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Desain Pemodelan
                </Link>
                <Link
                  href="/major/titl"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Instalasi Tenaga Listrik
                </Link>
                <Link
                  href="/major/las"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Pengelasan
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Artikel */}
          <div>
            <button
              onClick={() => handleDropdownToggle("artikel")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            >
              Artikel <ChevronDown className="ml-1 inline-block h-4 w-4" />
            </button>
            {openDropdown === "artikel" && (
              <div className="space-y-1 pl-4">
                <Link
                  href="/article/berita"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Berita
                </Link>
                <Link
                  href="/article/pengumuman"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Pengumuman
                </Link>
                <Link
                  href="/article/agenda"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Agenda
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Panduan */}
          <div>
            <button
              onClick={() => handleDropdownToggle("panduan")}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
            >
              Panduan <ChevronDown className="ml-1 inline-block h-4 w-4" />
            </button>
            {openDropdown === "panduan" && (
              <div className="space-y-1 pl-4">
                <Link
                  href="/guide/registration"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Pendaftaran
                </Link>
                <Link
                  href="/guide/school-fee"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Biaya Sekolah
                </Link>
                <Link
                  href="/guide/calendar-academic"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Kalender Akademik
                </Link>
                <Link
                  href="/guide/faq"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  FAQ
                </Link>
                <Link
                  href="/guide/download"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={handleLinkClick}
                >
                  Download
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
            onClick={handleLinkClick}
          >
            Kontak
          </Link>
          <ModeToggle />
        </div>
      )}
    </nav>
  );
}
