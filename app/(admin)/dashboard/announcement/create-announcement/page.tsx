"use client";

import Link from "next/link";

// components
import Topbar from "@/components/Topbar";
import { CreateAnnouncementForm } from "@/components/announcement-form";
import { useCreateAnnouncement } from "@/hooks/use-createAnnouncement";

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

export default function CreateAnnouncement() {
  const { handleCreate, isSubmitting, serverError } = useCreateAnnouncement();

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
                  <Link href="/dashboard/announcement">Daftar Pengumuman</Link>
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
          <CreateAnnouncementForm
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            serverError={serverError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
