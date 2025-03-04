"use client";

import { BookOpen } from "@/client/components/ui/icons/book-open";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";
import { Button } from "@/client/components/ui/button";
import { bookLibraries } from "@/shared/utils";
import { cn } from "@/client/utils";
import { useState, ReactNode } from "react";

const bookLibraryIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLibrariesWithIcons = bookLibraries.map((obj, i) => ({ ...obj, icon: bookLibraryIcons[i] }));

export function BookLocationRadioGroup({ isbn }: { isbn: string }) {
  console.log(isbn);
  const [library, setLibrary] = useState<string | null>(null);

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
              checked={obj.value === library}
              onClick={() => setLibrary(obj.value)}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      <div className="mt-6 flex items-center justify-start">
        {library && (
          <Button background={"dark"} className="text-sm" onClick={() => setLibrary(null)}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
