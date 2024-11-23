"use client";

import Link from "next/link";

// components
import Topbar from "@/components/Topbar";

// ui lib
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "sonner";
import { CreateAchievementForm } from "@/components/AchievementForm";

export default function CreateAchievement() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Topbar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/achievement">Daftar Pengumuman</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Buat Pengumuman</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Buat Pengumuman</CardTitle>
          <CardDescription>
            Lengkapi formulir untuk membuat pengumuman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAchievementForm />
        </CardContent>
      </Card>
    </div>
  );
}
