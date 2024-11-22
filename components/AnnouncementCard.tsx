import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  stripHtmlTags,
  truncateText,
  formatDate,
  extractImageUrl,
} from "@/utils/textUtils";
import { AnnouncementData } from "@/types/articleType";

interface AnnouncementCardProps {
  announcement: AnnouncementData;
  onDelete: (id: number) => void;
}

export function AnnouncementCard({
  announcement,
  onDelete,
}: AnnouncementCardProps) {
  const imageUrl = announcement.image
    ? `${process.env.NEXT_PUBLIC_API_STORAGE}/${announcement.image}`
    : extractImageUrl(announcement.content);

  const contentText = truncateText(stripHtmlTags(announcement.content), 150);

  return (
    <Card className="mb-2 flex flex-col items-start rounded-md p-2 shadow-sm md:flex-row md:p-3">
      {imageUrl && (
        <div className="mb-2 w-full md:mb-0 md:mr-3 md:w-1/5">
          <Image
            src={imageUrl}
            alt={announcement.title}
            width={300}
            height={250}
            className="h-auto w-full rounded-md object-cover"
            priority
          />
        </div>
      )}
      <div className="w-full md:w-4/5">
        <CardHeader>
          <CardTitle className="text-sm font-medium hover:underline md:text-base">
            <Link href={`/dashboard/announcement/${announcement.id}`}>
              {announcement.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            {formatDate(announcement.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs italic md:text-sm">{contentText}</p>
        </CardContent>
        <CardFooter className="mt-1 flex gap-2">
          <Link href={`/dashboard/announcement/${announcement.id}`}>
            <Button className="flex items-center gap-1 px-2 py-1 text-xs md:gap-1.5 md:px-3 md:py-1.5">
              <Pencil className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">Edit</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => onDelete(announcement.id)}
            className="flex items-center gap-1 px-2 py-1 text-xs md:gap-1.5 md:px-3 md:py-1.5"
          >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">Delete</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
