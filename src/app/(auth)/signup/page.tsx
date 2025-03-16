import React from "react";
import { Signup } from "@/root/src/libs/client/src/components/modules/auth/signup/signup";
import { getRedirectFromSearchParams } from "@/root/src/libs/client/src/utils";

export default function SignupPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const redirect = getRedirectFromSearchParams(searchParams);
  return <Signup redirect={redirect} />;
}
