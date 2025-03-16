import { ReactElement } from "react";
import { LoginForm } from "@/client/components/modules/auth/login/login-form";
import Link from "next/link";
import React from "react";

export function Login({ redirect }: { redirect: string }): ReactElement {
  return (
    <>
      <LoginForm redirect={encodeURIComponent(redirect)} />
      <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`}>Go to Sign Up page</Link>
    </>
  );
}
