import { ReactElement } from "react";
import { SignupForm } from "@/client/components/modules/auth/signup/signup-form";
import Link from "next/link";
import React from "react";

export function Signup({ redirect }: { redirect: string }): ReactElement {
  return (
    <>
      <SignupForm redirect={encodeURIComponent(redirect)} />
      <Link href={`/login?redirect=${encodeURIComponent(redirect)}`}>Go to Log In page</Link>
    </>
  );
}
