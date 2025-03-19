import { ReactElement } from "react";
import { Login } from "@/client/components/modules/auth/login/login";
import { getRedirectFromSearchParams } from "@/root/src/libs/client/src/utils";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<ReactElement> {
  const resolvedSearchParams = await searchParams;
  const redirect = getRedirectFromSearchParams(resolvedSearchParams);
  return <Login redirect={redirect} />;
}
