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

import { AnnouncementData } from "@/types/articleType";
import { stripHtmlTags, truncateText, formatDate } from "@/utils/textUtils";

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
    : null;

  const contentText = truncateText(stripHtmlTags(announcement.content), 150);

  return (
    <Card className="mb-4 flex flex-col items-start rounded-lg p-2 shadow-md md:flex-row md:p-4">
      {imageUrl && (
        <div className="mb-2 w-full md:mb-0 md:mr-4 md:w-1/4">
          <Image
            src={imageUrl}
            alt={announcement.title}
            width={400}
            height={350}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="w-full md:w-3/4">
        <CardHeader>
          <CardTitle className="text-base font-semibold hover:underline md:text-lg">
            <Link href={`/dashboard/announcement/${announcement.id}`}>
              {announcement.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {formatDate(announcement.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic md:text-base">{contentText}</p>
        </CardContent>
        <CardFooter className="mt-2 flex gap-2 md:gap-4">
          <Link href={`/dashboard/announcement/${announcement.id}`}>
            <Button className="flex items-center gap-1 px-3 py-1 text-sm md:gap-2 md:px-4 md:py-2">
              <Pencil className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden md:inline">Edit</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => onDelete(announcement.id)}
            className="flex items-center gap-1 px-3 py-1 text-sm md:gap-2 md:px-4 md:py-2"
          >
            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden md:inline">Delete</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
