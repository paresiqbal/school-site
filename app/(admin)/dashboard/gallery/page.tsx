import Galleries from "@/components/GalleryCard";
import Topbar from "@/components/Topbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-between pb-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <Topbar />
          <Breadcrumb className="ml-4 hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Gallery</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Galleries />
    </div>
  );
}
