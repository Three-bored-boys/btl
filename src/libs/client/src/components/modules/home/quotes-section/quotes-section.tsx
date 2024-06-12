"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import Container from "@/client/components/layouts/container";
import Quote from "./quote";
import quotes from "./quotes.json";
import { useState } from "react";

export default function QuotesSection() {
  const [index, setIndex] = useState<number>(0);

  const [translateXClassesArray, setTranslateXClassesArray] = useState(
    Array.from({ length: quotes.length }, (_, i) => i).map((_, i) => ({
      [`translate-x-[-${String(i * 100)}%]`]: index === i,
    })),
  );

  const updateIndexAndTranslateXClassesArray = function (updatedIndex: number) {
    setIndex(updatedIndex);

    const newTranslateXClassesArray = Array.from({ length: quotes.length }, (_, i) => i).map((_, i) => ({
      [`translate-x-[-${String(i * 100)}%]`]: updatedIndex === i,
    }));
    setTranslateXClassesArray(newTranslateXClassesArray);

    console.log(newTranslateXClassesArray, updatedIndex);
  };

  const nextQuote = function () {
    if (index < 2 && index >= 0) {
      const nextIndex = index + 1;
      updateIndexAndTranslateXClassesArray(nextIndex);
    } else {
      const newIndex = 0;
      updateIndexAndTranslateXClassesArray(newIndex);
    }
  };

  const prevQuote = function () {
    if (index <= 2 && index > 0) {
      const prevIndex = index - 1;
      updateIndexAndTranslateXClassesArray(prevIndex);
    } else {
      const newIndex = quotes.length - 1;
      updateIndexAndTranslateXClassesArray(newIndex);
    }
  };

  return (
    <section>
      <Container>
        <div className="overflow-hidden whitespace-nowrap">
          <div className={cn("transition-transform duration-500", ...translateXClassesArray)}>
            {quotes.map((obj, i) => {
              return <Quote {...obj} key={i} />;
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
