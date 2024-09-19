"use client";

import { AppContext } from "@/context/AppContext";
import { signOut } from "next-auth/react";
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AppContext);

  console.log(user);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user && (
          <div>
            <p className="text-white">Welcome, {user.name}!</p>
          </div>
        )}
      </main>

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
