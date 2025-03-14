"use client";

import { BadResponse, GoodResponse } from "@/root/src/libs/shared/src/types";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { cn } from "@/client/utils";
import { RadioCards } from "@radix-ui/themes";
import { Button } from "@/client/components/ui/button";
import { BookOpen } from "@/client/components/ui/icons/book-open";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { bookLibraries } from "@/shared/utils";
import { ReactNode, useTransition, useState, useEffect } from "react";
import { addUserBook, deleteUserBook } from "@/server/actions";
import { usePathname } from "next/navigation";

const bookLibraryIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLibrariesWithIcons = bookLibraries.map((obj, i) => ({ ...obj, icon: bookLibraryIcons[i] }));

export const BookLocationRadioGroup = function ({ library, isbn }: { library: string | null; isbn: string }) {
  const [libraryValue, setLibraryValue] = useState<string | null>(library);
  const [settledResult, setSettledResult] = useState<BadResponse | GoodResponse<string> | null>(null);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    if (settledResult?.success) {
      const timer = setTimeout(() => setSettledResult(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [settledResult]);

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
                startTransition(async () => {
                  const result = await addUserBook({ isbn, library: obj.value }, pathname);
                  setSettledResult(result);
                  setLibraryValue(obj.value);
                });
              }}
              disabled={isPending}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      <div className="mt-6 flex flex-col items-start justify-start">
        {libraryValue && (
          <Button
            background={"dark"}
            className="text-sm"
            onClick={() => {
              startTransition(async () => {
                const result = await deleteUserBook({ isbn }, pathname);
                setSettledResult(result);
                setLibraryValue(null);
              });
            }}
          >
            Clear
          </Button>
        )}
        <ServerResultMessage serverResult={settledResult}></ServerResultMessage>
      </div>
    </div>
  );
};

const ServerResultMessage = function ({ serverResult }: { serverResult: BadResponse | GoodResponse<string> | null }) {
  if (!serverResult) return null;
  if (serverResult.success) {
    return (
      <p className="flex items-center gap-x-0 text-success">
        <Check className="text-success" fill="#4ade80"></Check>
        {serverResult.data}
      </p>
    );
  }
  return (
    <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
      {serverResult.errors.map((error, i) => (
        <FormErrorListItem key={i}>{error}</FormErrorListItem>
      ))}
    </ul>
  );
};
