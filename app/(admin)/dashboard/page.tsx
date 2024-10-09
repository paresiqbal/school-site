"use client";

import CalendarComps from "@/components/Calendar";
import { useSession } from "next-auth/react";

// ui lib
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsComps from "@/components/News";

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
      <div className="pt-10">
        <Tabs defaultValue="account" className="w-10/12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="News">News</TabsTrigger>
            <TabsTrigger value="Announcement">Announcement</TabsTrigger>
            <TabsTrigger value="Agenda">Agenda</TabsTrigger>
            <TabsTrigger value="Gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="News">
            <NewsComps />
          </TabsContent>
          <TabsContent value="Announcement">
            <p>components here</p>
          </TabsContent>
          <TabsContent value="Agenda">
            <p>components here</p>
          </TabsContent>
          <TabsContent value="Gallery">
            <p>components here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
