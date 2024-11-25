"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateGallery() {
  const { token } = useContext(AppContext);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Clean up the object URL when component unmounts or when a new file is selected
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
        // Clear the image and preview after successful upload
        setImage(null);
        setPreviewUrl(null);
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
      const file = e.target.files[0];
      setImage(file);
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setImage(null);
      setPreviewUrl(null);
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
              <BreadcrumbLink asChild>
                <Link href="/dashboard/gallery">Gallery</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Create Gallery</BreadcrumbPage>
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
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Select Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            {previewUrl && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium">Image Preview:</h3>
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            )}
            <Button type="submit" className="mt-4">
              Upload
            </Button>
          </CardContent>
          <CardFooter>
            {message && (
              <p
                className={`mt-4 text-sm ${message.includes("Failed") || message.includes("error") ? "text-destructive" : "text-green-600"}`}
              >
                {message}
              </p>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
