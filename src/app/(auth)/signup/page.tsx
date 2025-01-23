import { ReactElement } from "react";
import { SignupForm } from "@/client/components/modules/auth/signup/signup-form";
import Link from "next/link";
import React from "react";
import { AuthPage } from "@/client/components/modules/auth/auth-page";

export default function SignupPage(): ReactElement {
  return (
    <AuthPage>
      <SignupForm />
      <Link href={"/login"}>Go to Log In page</Link>
    </AuthPage>
  );
}
