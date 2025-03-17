import React from "react";
import { Signup } from "@/root/src/libs/client/src/components/modules/auth/signup/signup";
import { getRedirectFromSearchParams } from "@/root/src/libs/client/src/utils";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirect = getRedirectFromSearchParams(resolvedSearchParams);
  return <Signup redirect={redirect} />;
}
