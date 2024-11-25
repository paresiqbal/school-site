"use client";

import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect, useState, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

interface Gallery {
  id: number;
  image_path: string;
}

export default function GalleryCard() {
  const { token } = useContext(AppContext);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleries = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_GALLERY}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch galleries");
      }
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      toast.error("Failed to load galleries. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGalleries();
  }, [token, fetchGalleries]);

  async function handleDelete(id: number) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GALLERY}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setGalleries(galleries.filter((gallery) => gallery.id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${gallery.image_path}`}
                  alt="Gallery Image"
                  className="h-48 w-full object-cover"
                  width={500}
                  height={500}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-2 right-2"
                  onClick={() => handleDelete(gallery.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
