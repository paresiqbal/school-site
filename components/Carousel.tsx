"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselPlugin() {
  const autoScrollPlugin = React.useRef(
    AutoScroll({
      speed: 2,
      startDelay: 0,
      direction: "forward",
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const slides = [
    { id: 1, content: "Slide 1", image: "/assets/carousel/carousel (1).jpg" },
    { id: 2, content: "Slide 2", image: "/assets/carousel/carousel (2).jpg" },
    { id: 3, content: "Slide 3", image: "/assets/carousel/carousel (3).jpg" },
    { id: 4, content: "Slide 4", image: "/assets/carousel/carousel (4).jpg" },
    { id: 5, content: "Slide 5", image: "/assets/carousel/carousel (5).jpg" },
  ];

  return (
    <Carousel
      plugins={[autoScrollPlugin.current]}
      className="w-full max-w-2xl lg:max-w-full"
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
              <div className="no-shadow h-[300px] border-foreground">
                <Image
                  src={slide.image}
                  alt={slide.content}
                  className="h-full w-full rounded-md object-cover"
                  quality={100}
                  priority
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
