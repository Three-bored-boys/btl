import { ReactElement } from "react";
import { Login } from "@/client/components/modules/auth/login/login";
import { getRedirectFromSearchParams } from "@/root/src/libs/client/src/utils";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): ReactElement {
  const redirect = getRedirectFromSearchParams(searchParams);
  return <Login redirect={redirect} />;
}
