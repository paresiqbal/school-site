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
    content: "",
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("News created:", result);
      setFormData({
        title: "",
        content: "",
      });
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
        <form onSubmit={handleCreate} className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
