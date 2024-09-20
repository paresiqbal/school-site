"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";

export default function News() {
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null,
    publish_at: "",
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/create-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formData,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("News created:", result);
    } else {
      console.error("Failed to create news");
    }
  };

  return (
    <div>
      <Breadcrumb className="hidden md:flex font-semibold">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white font-semibold">
              News
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-8">
        <form action="submit" onSubmit={handleCreate} className="flex flex-col">
          <input
            type="text"
            placeholder="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            placeholder="content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          <input
            type="datetime-local"
            value={formData.publish_at}
            onChange={(e) =>
              setFormData({ ...formData, publish_at: e.target.value })
            }
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
