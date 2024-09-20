"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user && (
        <div>
          <h1 className="font-bold text-2xl">Welcome, {session.user.name}!</h1>
        </div>
      )}
    </div>
  );
}
