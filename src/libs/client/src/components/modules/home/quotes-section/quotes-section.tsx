"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import Container from "@/client/components/layouts/container";
import Quote from "./quote";
import quotes from "./quotes.json";
import { useEffect, useRef, useState } from "react";

export default function QuotesSection() {
  const [index, setIndex] = useState<number>(0);

  const translateXClassesArray = useRef<string[]>([]);

  useEffect(() => {
    translateXClassesArray.current = Array.from({ length: quotes.length }, (_, i) => i).map(
      (_, i) => `translate-x-[-${String(i * 100)}%]`,
    );
    console.log(translateXClassesArray);
  }, []);

  const nextQuote = function () {
    if (index < 2 && index >= 0) {
      setIndex((i) => i + 1);
    } else {
      setIndex(0);
    }
  };

  const prevQuote = function () {
    if (index <= 2 && index > 0) {
      setIndex((i) => i - 1);
    } else {
      setIndex(2);
    }
  };

  return (
    <section>
      <Container>
        <div className="overflow-hidden whitespace-nowrap">
          <div className={cn("transition-transform duration-500", translateXClassesArray.current[index])}>
            {quotes.map((obj, i) => {
              return <Quote {...obj} key={i}></Quote>;
            })}
          </div>
        </div>
        <div className={cn("mt-5 flex w-full items-center justify-center")}>
          <span className={cn("mr-9 flex cursor-pointer items-center")} onClick={prevQuote}>
            <ArrowLeftCircle />
          </span>
          <span className={cn("flex cursor-pointer items-center")} onClick={nextQuote}>
            <ArrowRightCircle />
          </span>
        </div>
      </Container>
    </section>
  );
}
