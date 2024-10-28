"use client";

import { useSession } from "next-auth/react";

// components
import CalendarComps from "@/components/Calendar";
import Topbar from "@/components/Topbar";

// ui lib
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Topbar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <p>Dashboard</p>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <CalendarComps />
      </div>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        {session?.user && (
          <>
            <h1 className="text-center text-3xl font-bold sm:text-left">
              Welcome,{" "}
              <span className="text-primary">{session.user.name}!</span>
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
