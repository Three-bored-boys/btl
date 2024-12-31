"use client";

import { BookOpen } from "@/client/components/ui/icons/book-open";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";
import { Button } from "../../ui/button";
import { cn, bookLocations } from "../../../utils";
import { useState, ReactNode } from "react";

const bookLocationIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLocationsWithIcons = bookLocations.map((obj, i) => ({ ...obj, icon: bookLocationIcons[i] }));

export function BookLocationRadioGroup() {
  const [location, setLocation] = useState<string | null>(null);

  return (
    <div className="pt-3">
      <div>
        <RadioCards.Root size={"1"} color="bronze" columns={{ initial: "1", xs: "2", lg: "4" }}>
          {bookLocationsWithIcons.map((obj, i) => (
            <RadioCards.Item
              value={obj.value}
              key={i}
              className={cn("hover:cursor-pointer hover:bg-secondary-300")}
              title={`Add to '${obj.name}'`}
              checked={obj.value === location}
              onClick={() => setLocation(obj.value)}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      <div className="mt-6 flex items-center justify-start">
        {location && (
          <Button background={"dark"} className="text-sm" onClick={() => setLocation(null)}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
