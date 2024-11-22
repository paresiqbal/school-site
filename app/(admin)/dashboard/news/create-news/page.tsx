"use client";

import Link from "next/link";

// components
import Topbar from "@/components/Topbar";
import { CreateNewsForm } from "@/components/news-form";
import { useCreateNews } from "@/hooks/use-createNews";

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

export default function CreateNews() {
  const { handleCreate, isSubmitting, serverError } = useCreateNews();

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
                  <Link href="/dashboard/news">Daftar Berita</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Buat Berita</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Buat Berita</CardTitle>
          <CardDescription>
            Lengkapi formulir untuk membuat berita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewsForm
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            serverError={serverError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
