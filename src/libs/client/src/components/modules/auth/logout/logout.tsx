"use client";

import { ServerResult } from "@/root/src/libs/shared/src/types";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { Check } from "@/client/components/ui/icons/check";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { logout as logoutAction } from "@/server/actions";

export type LogoutState = ServerResult<string> | null;

export function Logout() {
  const [isPending, startTransition] = useTransition();
  const [logoutState, setLogoutState] = React.useState<LogoutState>(null);
  const router = useRouter();

  const ServerResultMessage = function ({ serverResult }: { serverResult: LogoutState }) {
    if (!serverResult) return null;
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
    <div className="mt-1 w-full">
      <SubmitButton
        defaultText="Log out"
        isSubmitting={isPending}
        submittingText="Logging out..."
        onClick={() => {
          startTransition(async () => {
            const newLogoutState = await logoutAction();
            setLogoutState(newLogoutState);
            if (newLogoutState.success) {
              router.refresh();
            }
          });
        }}
        textSize={"small"}
        background={"light"}
        className="inline-block w-full"
      />
      <ServerResultMessage serverResult={logoutState}></ServerResultMessage>
    </div>
  );
}
