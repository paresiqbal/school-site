"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "sonner";
import { AppContext } from "@/context/AppContext";
import Masonry from "react-masonry-css";
import { ArrowRight } from "lucide-react";

interface Gallery {
  id: number;
  image_path: string;
}

export default function GallerySection() {
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
      setGalleries(data.slice(0, 8));
    } catch (error) {
      console.error("Error fetching galleries:", error);
      toast.error("Failed to load galleries. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pb-4 pt-6 font-[family-name:var(--font-geist-sans)] md:items-center md:justify-center md:pt-12">
      <section>
        <div className="mx-auto max-w-7xl px-4 font-[family-name:var(--font-geist-sans)]">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Galeri SMK Negeri 1 Rejang Lebong
          </h2>
          <Toaster />
          <div className="mb-8">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="mb-4 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${gallery.image_path}`}
                    alt="Gallery Image"
                    width={300}
                    height={225}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </Masonry>
          </div>
          <div className="text-center">
            <Link href="/gallery" passHref>
              <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                Lihat Galeri Lengkap
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
