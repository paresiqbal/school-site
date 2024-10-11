"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";

// ui lib
import { Toaster, toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// icons
import { Loader } from "lucide-react";

interface AgendaData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function AgendaComps() {
  const { token } = useContext(AppContext);
  const [agenda, setAgenda] = useState<AgendaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgenda() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/agenda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch agenda.");
        }
        const data = await res.json();
        setAgenda(data);
        toast.success("Agenda loaded successfully");
      } catch (error) {
        console.error(error);
        setError("Failed to load agenda. Please try again.");
        toast.error("Failed to load agenda");
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, [token]);

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

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Toaster />
      {agenda.map((item, index) => (
        <div key={item.id}>
          <div className="mb-6 flex flex-col md:flex-row md:items-center">
            <div className="mb-4 w-full md:mb-0 md:w-3/4">
              <h2 className="md:text-md text-sm font-bold">{item.title}</h2>
              <p className="text-xs md:text-sm">
                {graphingText(item.description, 200)}
              </p>
            </div>
            <div className="text-xs md:text-sm">
              <p>
                <strong>Start Date:</strong> {formatDate(item.start_date)}
              </p>
              <p>
                <strong>End Date:</strong> {formatDate(item.end_date)}
              </p>
            </div>
          </div>
          {index < agenda.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
