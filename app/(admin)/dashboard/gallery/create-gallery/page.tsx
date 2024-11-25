"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

// ui components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreateGallery() {
  const { token } = useContext(AppContext);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_GALLERY}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Image uploaded successfully.");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to upload image: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("An error occurred.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

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
      <form onSubmit={handleImageUpload}>
        <Card>
          <CardHeader>
            <CardTitle>
              <span>Buat Gallery</span>
            </CardTitle>
            <CardDescription>Upload Foto</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm file:mr-5 file:border-[1px] file:bg-stone-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
            />
            <Button type="submit">Upload</Button>
          </CardContent>

          <CardFooter>
            {message && (
              <p className="text-desctructive mt-4 text-sm">{message}</p>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
