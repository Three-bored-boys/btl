"use client";

import { SanitizedUser } from "@/shared/db/schema";
import React from "react";
import { fetchData } from "@/client/utils";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/client/providers/auth-context-provider";

export const getUser = async function () {
  try {
    const { fetchDataResult, res } = await fetchData<SanitizedUser>(`/api/auth/validate-session`, {
      credentials: "include",
    });

    if (!fetchDataResult.success || res.status === 401) {
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

export const useValidateUserSession = function () {
  const { user, setUser } = useAuthContext();
  const query = useQuery({
    queryKey: ["btl_session_user"],
    queryFn: () => getUser(),
    refetchOnMount: true,
  });
  React.useEffect(() => {
    if (query.data !== undefined) {
      setUser(query.data);
    }
  }, [query.data]);

  return { query, user, setUser };
};
