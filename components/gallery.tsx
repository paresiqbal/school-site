"use client";

import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface Gallery {
  id: number;
  image_path: string;
}

export default function Galleries() {
  const { token } = useContext(AppContext);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GALLERY}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setGalleries(data);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleries();
  }, [token]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {galleries.map((gallery) => (
        <div key={gallery.id} className="rounded border p-4 shadow">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_STORAGE}/${gallery.image_path}`}
            alt="Gallery Image"
            className="h-48 w-full rounded object-cover"
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
}
