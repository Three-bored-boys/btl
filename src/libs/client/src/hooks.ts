"use client";

import { SanitizedUser } from "@/shared/db/schema";
import React from "react";
import { fetchData } from "@/client/utils";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/client/providers/auth-context-provider";

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

export const useAuthContext = function () {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};

export const useValidateUserSession = function (initialUser?: SanitizedUser | null) {
  const { data, isLoading } = useQuery({ queryKey: ["btl_session_user"], queryFn: () => validateUser(), staleTime: 0 });
  const [user, setUser] = React.useState<SanitizedUser | null>(initialUser ?? null);
  const value = React.useMemo(() => ({ user, setUser }), [user]);
  React.useEffect(() => {
    if (data !== undefined) {
      setUser(data);
    }
  }, [data]);

  return { data, isLoading, value, user, setUser };
};
