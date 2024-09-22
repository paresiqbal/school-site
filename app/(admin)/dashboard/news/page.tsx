"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

export default function CreateNews() {
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${token} `,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      console.log("News created successfully");
    }

    console.log(data);
  }

  return (
    <div>
      <h1>Create New News</h1>
      <form onSubmit={handleCreate} className="w-1/2 mx-auto">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <textarea
            placeholder="content"
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
        </div>
        <button className="w-4 bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
