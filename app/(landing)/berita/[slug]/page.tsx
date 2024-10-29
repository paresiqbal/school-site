"use client";

import { useEffect, useState } from "react";

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const params = await props.params;
      setSlug(params.slug);
    };

    fetchParams();
  }, [props.params]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 h-64 w-full rounded-md bg-gray-300"></div>

      <h1 className="mb-4 text-3xl font-bold">
        How to convert CommonJS to ESM
      </h1>

      <div className="mb-4 flex items-center space-x-2 text-gray-500">
        <span className="text-sm">October 16, 2024</span>
        <span>•</span>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          <span>Andy Jiang</span>
        </div>
      </div>

      <span className="mb-4 inline-block rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600">
        How To
      </span>

      <hr className="my-4 border-t border-gray-300" />

      <div className="space-y-4 leading-relaxed text-gray-800">
        <p>
          ECMAScript modules () are the official, modern way of writing and
          sharing JavaScript — its supported in many environments (e.g.,
          browsers, the edge, and modern runtimes like Deno) and offers a better
          development experience (e.g., async loading and being able to export
          without globals).
        </p>
        <p>
          While CommonJS was the standard for many years, supporting CommonJS
          today is hurting the JavaScript community.
        </p>
      </div>

      <div className="mt-8 text-gray-500">
        <p>Post Slug: {slug}</p>
      </div>
    </div>
  );
}
