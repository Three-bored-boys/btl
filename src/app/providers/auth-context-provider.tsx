"use client";

import { createContext } from "react";
import { SanitizedUser } from "@/shared/db/schema";
import React from "react";

const AuthContext = createContext<{
  user: SanitizedUser | null;
  setUser: React.Dispatch<React.SetStateAction<SanitizedUser | null>>;
} | null>(null);

export const AuthContextProvider = function ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: SanitizedUser | null;
}) {
  const [user, setUser] = React.useState<SanitizedUser | null>(initialUser);

  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = function () {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
