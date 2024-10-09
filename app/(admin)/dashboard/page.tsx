"use client";

import CalendarComps from "@/components/Calendar";
import { useSession } from "next-auth/react";

// ui lib

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="py-4">
      <div className="flex justify-between">
        {session?.user && (
          <>
            <h1 className="font-bold text-3xl">
              Welcome,{" "}
              <span className="text-primary">{session.user.name}!</span>
            </h1>
            <CalendarComps />
          </>
        )}
      </div>
    </div>
  );
}
