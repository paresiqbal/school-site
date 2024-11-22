export const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit).trimEnd() + "...";
};

export const extractImageUrl = (html: string): string | null => {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
};

export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "Date not available";

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
};
