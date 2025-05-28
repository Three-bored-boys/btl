"use client";

import { cn } from "@/client/utils";
import { ArrowLeftCircle } from "@/client/components/ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "@/client/components/ui/icons/arrow-right-circle";
import { Container } from "@/client/components/layouts/container";
import { Quote } from "./quote";
import quotes from "./quotes.json";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function QuotesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 30, startIndex: 0 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      if (index > 0 && index < quotes.length) {
        emblaApi.scrollPrev();
        const newIndex = index - 1;
        setIndex(newIndex);
      } else {
        const newIndex = quotes.length - 1;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
      }
    }
  }, [emblaApi, index]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (index < quotes.length - 1 && index >= 0) {
        emblaApi.scrollNext();
        const newIndex = index + 1;
        setIndex(newIndex);
      } else {
        const newIndex = 0;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
      }
    }
  }, [emblaApi, index]);

  return (
    <section>
      <Container className="py-10">
        <div ref={emblaRef} className="overflow-hidden">
          <div className={cn("flex")}>
            {quotes.map((obj, i) => {
              return <Quote {...obj} key={i} />;
            })}
          </div>
        </div>
        <div className="mt-8 flex w-full items-center justify-center gap-2">
          {quotes.map((_, i) => (
            <div
              key={i}
              className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === index })}
              onClick={() => {
                setIndex(i);
                emblaApi?.scrollTo(i);
              }}
            ></div>
          ))}
        </div>
        <div className={cn("mt-5 flex w-full items-center justify-center")}>
          <span className={cn("mr-9 flex cursor-pointer items-center")} onClick={scrollPrev}>
            <ArrowLeftCircle />
          </span>
          <span className={cn("flex cursor-pointer items-center")} onClick={scrollNext}>
            <ArrowRightCircle />
          </span>
        </div>
      </Container>
    </section>
  );
}
