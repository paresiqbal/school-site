"use client";

// ex lib
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

// ui lib
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";

export default function CalendarComps() {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <div>
      <div>
        <Popover open={calendarVisible} onOpenChange={setCalendarVisible}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal")}
              onClick={toggleCalendar}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentDate ? (
                format(currentDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
