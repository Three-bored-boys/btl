import { ReactElement } from "react";
import { LoginForm } from "@/client/components/modules/auth/login/login-form";
import Link from "next/link";
import React from "react";
import { AuthPage } from "@/client/components/modules/auth/auth-page";

export function Login(): ReactElement {
  return (
    <AuthPage>
      <LoginForm />
      <Link href={"/signup"}>Go to Sign Up page</Link>
    </AuthPage>
  );
}
