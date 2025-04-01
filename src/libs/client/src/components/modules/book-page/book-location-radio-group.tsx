"use client";

import { ServerResult } from "@/shared/types";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { cn } from "@/client/utils";
import { BookOpen } from "@/client/components/ui/icons/book-open";
import { Button } from "@/client/components/ui/button";
import { ListBullet } from "@/client/components/ui/icons/list-bullet";
import { Check } from "@/client/components/ui/icons/check";
import { Trash } from "@/client/components/ui/icons/trash";
import { bookLibraries } from "@/shared/utils";
import { ReactNode, useEffect, useState } from "react";
import { mutateUserBook } from "@/server/actions";
import { useWindowLocationHref } from "@/client/hooks/window-location-href";
import { useActionState } from "react";
import { Grid } from "@radix-ui/themes";

const bookLibraryIcons: [ReactNode, ReactNode, ReactNode, ReactNode] = [
  <BookOpen key={0} />,
  <ListBullet key={1} />,
  <Check key={2} />,
  <Trash key={3} />,
];
const bookLibrariesWithIcons = bookLibraries.map((obj, i) => ({ ...obj, icon: bookLibraryIcons[i] }));

export const BookLocationRadioGroup = function ({ library, isbn }: { library: string | null; isbn: string }) {
  const redirectUrl = useWindowLocationHref();
  const [state, action, isPending] = useActionState(mutateUserBook, null);
  const [settledResult, setSettledResult] = useState<ServerResult<string> | null>(null);

  useEffect(() => {
    setSettledResult(state);
    let timer: NodeJS.Timeout;
    if (state?.success) {
      timer = setTimeout(() => setSettledResult(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <form className="block pt-3" action={action}>
      <input type="hidden" name="isbn" value={isbn}></input>
      <input type="hidden" name="redirect" value={redirectUrl}></input>
      <div>
        <Grid columns={{ initial: "1", xs: "2", lg: "4" }} gap={{ initial: "2", xs: "3", lg: "4" }}>
          {bookLibrariesWithIcons.map((obj, i) => (
            <Button
              title={`Add to '${obj.name}'`}
              disabled={isPending}
              name={obj.value !== library ? "library" : undefined}
              value={obj.value !== library ? obj.value : undefined}
              type="submit"
              className={cn(
                "flex items-center justify-center gap-1 rounded-md bg-secondary-50 text-sm hover:cursor-pointer hover:bg-secondary-100 md:gap-2 md:text-base",
                {
                  "border-2 border-secondary-300 bg-secondary-100 hover:bg-secondary-200": obj.value === library,
                  "bg-slate-50 hover:cursor-wait hover:bg-slate-100": isPending,
                  "border-2 border-gray-300 hover:bg-gray-200": obj.value === library && isPending,
                },
              )}
              key={i}
            >
              <span>{obj.name}</span>
              {obj.icon}
            </Button>
          ))}
        </Grid>
      </div>
      <div className="mt-6 flex flex-col items-start justify-start">
        <ServerResultMessage serverResult={settledResult}></ServerResultMessage>
      </div>
    </form>
  );
};

const ServerResultMessage = function ({ serverResult }: { serverResult: ServerResult<string> | null }) {
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
