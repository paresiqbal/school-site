"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

interface Errors {
  auth?: string;
  title?: string;
  content?: string;
  network?: string;
}

export default function CreateNews() {
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");

  console.log("Token from context:", token);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setErrors({ auth: "Authentication token is missing. Please log in." });
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        setErrors({ auth: "Unauthorized. Please log in again." });
        return;
      }

      const data = await res.json();

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setSuccessMessage("News created successfully");
        setFormData({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setErrors({ network: "Network error. Please try again later." });
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Create New News</h1>

      {errors.auth && <p className="text-red-600 mb-4">{errors.auth}</p>}
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={handleCreate}
        className="bg-gray-100 p-4 rounded shadow-md"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && <p className="text-red-600">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Content"
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.content && <p className="text-red-600">{errors.content}</p>}
        </div>

        {errors.network && <p className="text-red-600">{errors.network}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
