"use client";

import { useSession } from "next-auth/react";

// ui lib
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ModeToggle";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <Breadcrumb className="hidden md:flex pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-white/70 hover:text-white">
              Recent Orders
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      {session?.user && (
        <div>
          <h1 className="font-bold text-2xl">
            Welcome, <span className="text-primary">{session.user.name}!</span>
          </h1>
        </div>
      )}
      <ModeToggle />
    </div>
  );
}
