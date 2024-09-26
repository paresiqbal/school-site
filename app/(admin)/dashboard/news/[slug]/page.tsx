import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { Toaster, toast } from "sonner";
import { AppContext } from "@/context/AppContext";

// Define the type for the news item
type NewsItem = {
  id: string;
  title: string;
  content: string;
};

export default function DetailNews() {
  const { token } = useContext(AppContext);
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // This is how you access the dynamic route parameter

  useEffect(() => {
    async function fetchNewsItem() {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      if (!id) {
        setError("No news item ID provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch news item.");
        }

        const data = await res.json();
        setNewsItem(data);
        toast.success("News item loaded successfully");
      } catch (error) {
        console.error("Error fetching news item:", error);
        setError("Failed to load news item. Please try again.");
        toast.error("Failed to load news item");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchNewsItem();
    }
  }, [token, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (!newsItem) return null;

  return (
    <div>
      <Toaster />
      <h1>{newsItem.title}</h1>
      <p>{newsItem.content}</p>
    </div>
  );
}
