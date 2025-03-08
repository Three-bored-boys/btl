"use client";

import { BookOpen } from "@/client/components/ui/icons/book-open";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";
import { Button } from "@/client/components/ui/button";
import { bookLibraries } from "@/shared/utils";
import { cn } from "@/client/utils/utils";
import { ReactNode } from "react";
import { useBookPage } from "@/client/hooks/book-page";
import { BadResponse, GoodResponse } from "@/root/src/libs/shared/src/types";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";

const bookLibraryIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLibrariesWithIcons = bookLibraries.map((obj, i) => ({ ...obj, icon: bookLibraryIcons[i] }));

export function BookLocationRadioGroup({ isbn }: { isbn: string }) {
  const { libraryValue, setLibraryValue, query, mutation, settledMessage } = useBookPage(isbn);
  console.log(libraryValue);

  const ServerResultMessage = function ({ serverResult }: { serverResult: BadResponse | GoodResponse<string> }) {
    if (serverResult.success) {
      return (
        <p className="flex items-center gap-x-0 text-success">
          <Check className="text-success" fill="#4ade80"></Check>
          {serverResult.data}
        </p>
      );
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {serverResult.errors.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      );
    }
  };

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
              onClick={() => {
                setLibraryValue(obj.value);
                mutation.mutate(obj.value);
              }}
              disabled={query.isLoading || mutation.isPending}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      {settledMessage !== null && <div>{settledMessage.success}</div>}
      <div className="mt-6 flex flex-col items-start justify-start">
        {libraryValue && (
          <Button
            background={"dark"}
            className="text-sm"
            onClick={() => {
              setLibraryValue(null);
              mutation.mutate(null);
            }}
          >
            Clear
          </Button>
        )}
        {settledMessage !== null && <ServerResultMessage serverResult={settledMessage}></ServerResultMessage>}
      </div>
    </div>
  );
}
