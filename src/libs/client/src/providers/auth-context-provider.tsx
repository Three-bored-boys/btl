"use client";

import { createContext } from "react";
import { SanitizedUser } from "@/shared/db/schema";
import React from "react";
import { fetchData } from "@/client/utils";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@radix-ui/themes";
import { Logo } from "@/client/components/ui/logo";

const AuthContext = createContext<{
  user: SanitizedUser | null;
  setUser: React.Dispatch<React.SetStateAction<SanitizedUser | null>>;
} | null>(null);

export const validateUser = async function () {
  try {
    const { fetchDataResult } = await fetchData<SanitizedUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-session`,
      {
        credentials: "include",
      },
    );

    if (!fetchDataResult.success) {
      return null;
    }

    const { data } = fetchDataResult;
    return data;
  } catch (e) {
    return null;
  }
};

export const useValidateUser = function () {
  return useQuery({ queryKey: ["btl_session_user"], queryFn: () => validateUser(), staleTime: 0 });
};

export const AuthContextProvider = function ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SanitizedUser | null>(null);
  const { data, isLoading } = useValidateUser();
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

export const useAuthContext = function () {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
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
