import { ServerResult } from "@/root/src/libs/shared/src/types";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { fetchData } from "@/client/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "@/client/components/ui/icons/check";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";

type LogoutState = ServerResult<string> | null;

const logout = async function (): Promise<ServerResult<string>> {
  try {
    const { fetchDataResult } = await fetchData<string>(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
    });

    return { serverResult: fetchDataResult };
  } catch (e) {
    return { serverResult: { success: false, errors: ["Something went wrong. Please try again."] } };
  }
};

export function Logout() {
  const [logoutState, setLogoutState] = React.useState<LogoutState>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      if (data) {
        setLogoutState(data);
        if (data.serverResult.success) {
          await Promise.allSettled([
            queryClient.invalidateQueries({ queryKey: ["btl_session_user"], exact: true, refetchType: "all" }),
            queryClient.invalidateQueries(),
          ]);
          router.refresh();
        }
      }
    },
  });

  const ServerResultMessage = function ({ serverResult: { serverResult } }: { serverResult: ServerResult<string> }) {
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
        onClick={() => mutate()}
        textSize={"small"}
        background={"light"}
        className="inline-block w-full"
      />
      {logoutState !== null && <ServerResultMessage serverResult={logoutState}></ServerResultMessage>}
    </div>
  );
}
