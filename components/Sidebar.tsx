import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

// ui lib
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// icons
import {
  Home,
  Newspaper,
  Calendar,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  Info,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";

interface SidebarContentProps {
  isShrunk: boolean;
  setIsShrunk: (shrunk: boolean) => void;
  isDesktop: boolean;
  onClose?: () => void;
}

// Menu items for the sidebar
const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: Newspaper,
    label: "News",
    href: "#",
    submenu: [
      { label: "Create News", href: "/dashboard/createNews" },
      { label: "News List", href: "/dashboard/news" },
    ],
  },
  {
    icon: Calendar,
    label: "Agenda",
    href: "#",
    submenu: [
      { label: "Create Agenda", href: "/dashboard/createAgenda" },
      { label: "Agenda List", href: "/dashboard/agenda" },
    ],
  },
  {
    icon: Info,
    label: "Announcement",
    href: "#",
    submenu: [
      { label: "Create Announcement", href: "/dashboard/createAnnouncement" },
      { label: "Announcement List", href: "/dashboard/announcement" },
    ],
  },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex transition-all duration-300 ease-in-out",
          isShrunk ? "w-16" : "w-64"
        )}
      >
        <SidebarContent
          isShrunk={isShrunk}
          setIsShrunk={setIsShrunk}
          isDesktop={true}
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-full">
          <SidebarContent
            isShrunk={false}
            setIsShrunk={() => {}}
            isDesktop={false}
            onClose={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SidebarContent({
  isShrunk,
  setIsShrunk,
  isDesktop,
  onClose,
}: SidebarContentProps) {
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r transition-all duration-300 ease-in-out", // h-screen ensures it takes full screen height
        isDesktop ? (isShrunk ? "w-16" : "w-64") : "w-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between border-b pr-4 bg-foreground">
        <div className="flex items-center space-x-2">
          {(!isShrunk || !isDesktop) && (
            <a
              className="text-bold border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              SMKN 1 RL
            </a>
          )}
        </div>

        {/* Shrink/Expand Button */}
        {isDesktop ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShrunk(!isShrunk)}
            className={cn(
              "transition-all duration-300 ease-in-out bg-background",
              isShrunk ? "ml-0" : "ml-auto"
            )}
          >
            {isShrunk ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="transition-all duration-300 ease-in-out"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        )}
      </div>

      {/* Scrollable Sidebar Content */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <nav
          className={cn(
            "flex flex-col gap-2 p-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "items-center"
          )}
        >
          {menuItems.map((item, index) =>
            item.submenu ? (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-between w-full",
                      isShrunk && isDesktop && "justify-center p-0 h-12"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {(!isShrunk || !isDesktop) && <span>{item.label}</span>}
                    </div>
                    {(!isShrunk || !isDesktop) && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.href} passHref>
                      <Button variant="ghost" className="w-full justify-start">
                        {subItem.label}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link key={index} href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start gap-2 transition-all duration-300 ease-in-out",
                    isShrunk && isDesktop
                      ? "w-12 h-12 p-0 justify-center"
                      : "w-full"
                  )}
                  title={isShrunk && isDesktop ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {(!isShrunk || !isDesktop) && (
                    <span className="transition-opacity duration-300 ease-in-out">
                      {item.label}
                    </span>
                  )}
                </Button>
              </Link>
            )
          )}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div
        className={cn(
          "border-t p-4 transition-all duration-300 ease-in-out",
          isShrunk && isDesktop && "flex flex-col items-center"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 mb-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-neutral-600" />
          {(!isShrunk || !isDesktop) && (
            <span className="text-sm font-medium transition-opacity duration-300 ease-in-out">
              {session?.user?.name || "Unknown User"}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "justify-center p-0 w-12 h-12"
          )}
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {(!isShrunk || !isDesktop) && (
            <span className="transition-opacity duration-300 ease-in-out">
              Logout
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
