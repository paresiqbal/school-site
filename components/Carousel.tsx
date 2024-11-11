"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const autoScrollPlugin = React.useRef(
    AutoScroll({
      speed: 3,
      startDelay: 0,
      direction: "forward",
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const slides = [
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
    { id: 4, content: "Slide 4" },
    { id: 5, content: "Slide 5" },
  ];

  return (
    <Carousel
      plugins={[autoScrollPlugin.current]}
      className="w-full max-w-2xl lg:max-w-6xl"
      onMouseEnter={autoScrollPlugin.current.stop}
      onMouseLeave={autoScrollPlugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="p-2">
              <Card className="no-shadow h-[400px]">
                <CardContent className="flex h-full items-center justify-center p-4">
                  <span className="text-4xl font-semibold">
                    {slide.content}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
