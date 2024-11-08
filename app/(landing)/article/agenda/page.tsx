"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ui
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AgendaData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function Agenda() {
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgenda() {
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_AGENDA}`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch agenda.");
        }
        const data = await res.json();
        setAgenda(data);
        toast.success("Agenda berhasil diambil");
      } catch (error) {
        console.error(error);
        setError("Failed to load agenda. Please try again.");
        toast.error("Gagal mengambil agenda");
      }
    }

    fetchAgenda();
  }, []);

  const graphingText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 md:items-center md:justify-center md:pt-12">
      <div className="space-y-2 pb-8">
        <h1 className="scroll-m-20 text-balance text-4xl font-bold tracking-tight lg:text-5xl">
          Agenda
        </h1>
      </div>
      <Toaster />

      {/* List of Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agenda.map((item) => (
          <Card key={item.id} className="rounded-md bg-card p-2 shadow-sm">
            <div className="w-full">
              <Image
                src="/assets/bell.png"
                width={200}
                height={150}
                alt="bell"
                priority
                className="h-40 w-full rounded-t-md bg-gray-100 object-contain dark:bg-white"
              />
            </div>
            <CardHeader className="p-2">
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p>{graphingText(item.description, 100)}</p>
              <div className="space-y-1 py-2 text-sm">
                <p>
                  <strong>Mulai:</strong> {formatDate(item.start_date)}
                </p>
                <p>
                  <strong>Sampai:</strong> {formatDate(item.end_date)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
