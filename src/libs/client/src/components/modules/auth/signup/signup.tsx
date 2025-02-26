import { ReactElement } from "react";
import { SignupForm } from "@/client/components/modules/auth/signup/signup-form";
import Link from "next/link";
import React from "react";

export function Signup(): ReactElement {
  return (
    <>
      <SignupForm />
      <Link href={"/login"}>Go to Log In page</Link>
    </>
  );
}
