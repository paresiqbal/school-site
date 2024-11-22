"use client";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

export default function UploadForm() {
  const { token } = useContext(AppContext);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_GALLERY}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Image uploaded successfully.");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to upload image: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("An error occurred.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleImageUpload} className="rounded border p-4 shadow">
      <label className="mb-2 block">
        <span className="text-gray-700">Select Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-gray-900"
        />
      </label>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </form>
  );
}
