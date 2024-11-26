import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDate, truncateText } from "@/utils/textUtils";
import { AgendaData } from "@/types/articleType";

interface AgendaCardProps {
  agenda: AgendaData;
  onDelete: (id: number) => void;
}

export function AgendaCard({ agenda, onDelete }: AgendaCardProps) {
  return (
    <Card className="rounded-md bg-card p-2 shadow-sm">
      <div className="w-full">
        <Image
          src="/assets/agenda.svg"
          width={200}
          height={150}
          alt="bell"
          priority
          className="h-40 w-full rounded-t-md bg-gray-100 object-contain dark:bg-white"
        />
      </div>
      <CardHeader className="p-2">
        <CardTitle>{agenda.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <p>{truncateText(agenda.description, 100)}</p>
        <div className="space-y-1 py-2 text-sm">
          <p>
            <strong>Mulai:</strong> {formatDate(agenda.start_date)}
          </p>
          <p>
            <strong>Sampai:</strong> {formatDate(agenda.end_date)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-end gap-2 p-2">
        <Button
          variant="destructive"
          onClick={() => onDelete(agenda.id)}
          className="flex items-center gap-1 px-2 py-1 text-xs md:text-sm"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
