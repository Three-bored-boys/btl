"use client";

import { BookOpen } from "@/client/components/ui/icons/book-open";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";
import { Button } from "@/client/components/ui/button";
import { bookLibraries } from "@/shared/utils";
import { cn } from "@/client/utils";
import { ReactNode } from "react";
import { useBookPage } from "@/client/hooks/book-page";

const bookLibraryIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLibrariesWithIcons = bookLibraries.map((obj, i) => ({ ...obj, icon: bookLibraryIcons[i] }));

export function BookLocationRadioGroup({ isbn }: { isbn: string }) {
  const { libraryValue, setLibraryValue, query } = useBookPage(isbn);
  console.log(libraryValue);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-3">
      <div>
        <RadioCards.Root size={"1"} color="bronze" columns={{ initial: "1", xs: "2", lg: "4" }}>
          {bookLibrariesWithIcons.map((obj, i) => (
            <RadioCards.Item
              value={obj.value}
              key={i}
              className={cn("hover:cursor-pointer hover:bg-secondary-300")}
              title={`Add to '${obj.name}'`}
              checked={obj.value === libraryValue}
              onClick={() => setLibraryValue(obj.value)}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      <div className="mt-6 flex items-center justify-start">
        {libraryValue && (
          <Button background={"dark"} className="text-sm" onClick={() => setLibraryValue(null)}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
