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

  return <div>My Post: {slug}</div>;
}
