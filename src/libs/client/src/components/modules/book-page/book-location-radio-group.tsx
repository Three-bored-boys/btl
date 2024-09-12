"use client";

import BookOpen from "@/client/components/ui/icons/book-open";
import ListBullet from "@/client/components/ui/icons/list-bullet";
import Check from "@/client/components/ui/icons/check";
import Trash from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";
import Button from "../../ui/button";
import { cn } from "../../../utils";
import { useState } from "react";

const bookLocations = [
  { name: "Currently Reading", value: "reading", icon: <BookOpen /> },
  { name: "Want To Read", value: "want-to-read", icon: <ListBullet /> },
  { name: "Finished", value: "finished", icon: <Check /> },
  { name: "Did Not Finish", value: "did-not-finish", icon: <Trash /> },
] as const;

export default function BookLocationRadioGroup() {
  const [location, setLocation] = useState<string | null>(null);

  return (
    <div className="pt-3">
      <div>
        <RadioCards.Root size={"1"} color="bronze" columns={{ initial: "1", xs: "2", lg: "4" }}>
          {bookLocations.map((obj, i) => (
            <RadioCards.Item
              value={obj.value}
              key={i}
              className={cn("hover:bg-secondary-300")}
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
      <div className="flex items-center justify-start pt-6">
        {location && (
          <Button background={"dark"} className="text-sm" onClick={() => setLocation(null)}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
