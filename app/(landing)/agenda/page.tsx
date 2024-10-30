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
        const res = await fetch("http://127.0.0.1:8000/api/agenda", {
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
    <div className="container mx-auto mb-8 flex max-w-[1200px] flex-col px-4 pt-6 md:px-0 md:pt-12">
      <div className="space-y-2">
        <h1 className="mb-2 text-3xl font-bold underline decoration-emerald-500 underline-offset-8 md:mb-6 md:text-5xl">
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
