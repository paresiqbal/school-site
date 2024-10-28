"use client";

import { useSession } from "next-auth/react";

// components
import NewsComps from "@/components/News";
import CalendarComps from "@/components/Calendar";
import AnnouncementComps from "@/components/Announcement";
import AgendaComps from "@/components/Agenda";

// ui lib
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-col items-center justify-between sm:flex-row">
        {session?.user && (
          <>
            <h1 className="text-center text-3xl font-bold sm:text-left">
              Welcome,{" "}
              <span className="text-primary">{session.user.name}!</span>
            </h1>
            <CalendarComps />
          </>
        )}
      </div>
      <div className="pt-10">
        <Tabs defaultValue="account" className="w-full sm:w-10/12">
          <TabsList className="mb-10 grid w-full grid-cols-2 sm:grid-cols-4 lg:mb-2">
            <TabsTrigger value="News">News</TabsTrigger>
            <TabsTrigger value="Announcement">Announcement</TabsTrigger>
            <TabsTrigger value="Agenda">Agenda</TabsTrigger>
            <TabsTrigger value="Gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="News">
            <Card className="p-2">
              <NewsComps />
            </Card>
          </TabsContent>
          <TabsContent value="Announcement">
            <Card>
              <AnnouncementComps />
            </Card>
          </TabsContent>
          <TabsContent value="Agenda">
            <Card>
              <AgendaComps />
            </Card>
          </TabsContent>
          <TabsContent value="Gallery">
            <p>components here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
