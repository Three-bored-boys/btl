"use client";

import { createContext } from "react";
import { SanitizedUser } from "@/shared/db/schema";
import React from "react";
import { fetchData } from "@/client/utils";
import { useQuery } from "@tanstack/react-query";

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
  const { data, error, isLoading } = useValidateUser();
  const value = React.useMemo(() => ({ user, setUser }), [user]);
  React.useEffect(() => {
    if (data !== undefined) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR!!!</div>;
  }
  console.log(data);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = function () {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
