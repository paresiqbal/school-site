import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function Topbar() {
  return (
    <div className="mr-2 flex justify-center">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="my-0" />
    </div>
  );
}
