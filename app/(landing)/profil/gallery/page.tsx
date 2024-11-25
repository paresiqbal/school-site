"use client";

import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import Masonry from "react-masonry-css";

interface Gallery {
  id: number;
  image_path: string;
}

export default function Gallery() {
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="mb-4 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${gallery.image_path}`}
                  alt="Gallery Image"
                  width={500}
                  height={500}
                  className="w-full object-cover"
                  style={{ aspectRatio: "auto" }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}
