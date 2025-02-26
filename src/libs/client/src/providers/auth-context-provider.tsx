"use client";

import { createContext } from "react";
import { SanitizedUser } from "@/shared/db/schema";
import React from "react";
import { Spinner } from "@radix-ui/themes";
import { Logo } from "@/client/components/ui/logo";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../hooks";

export const AuthContext = createContext<{
  user: SanitizedUser | null;
  setUser: React.Dispatch<React.SetStateAction<SanitizedUser | null>>;
} | null>(null);

export const AuthContextProvider = function ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SanitizedUser | null>(null);
  const { data, isLoading } = useQuery({ queryKey: ["btl_session_user"], queryFn: () => getUser(), staleTime: 0 });
  const value = React.useMemo(() => ({ user, setUser }), [user]);
  React.useEffect(() => {
    if (data !== undefined) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return <CheckingUserSession />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const CheckingUserSession = function () {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-96 flex-col items-center justify-center gap-2 px-3">
        <Spinner size={"3"} />
        <div className="flex h-1 w-full items-center justify-center bg-primary"></div>
        <Logo className="w-full text-7xl sm:text-9xl" />
        <div className="flex h-1 w-full items-center justify-center bg-secondary"></div>
      </div>
    </div>
  );
};
