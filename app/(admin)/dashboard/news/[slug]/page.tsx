"use client";
import { useState, useEffect } from "react";

type DetailNewsProps = { params: { slug: string } };

interface NewsDetail {
  title: string;
  content: string;
}

export default function DetailNews(props: DetailNewsProps) {
  const { params } = props;
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/news/${params.slug}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setNewsDetail(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error("Invalid JSON response");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [params.slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!newsDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newsDetail.title}</h1>
      <p>{newsDetail.content}</p>
    </div>
  );
}
