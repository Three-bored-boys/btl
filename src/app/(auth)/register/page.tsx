import { ReactElement } from "react";
import RegisterForm from "@/client/components/modules/auth/register/register-form";
import Link from "next/link";
import React from "react";

export default function Register(): ReactElement {
  return (
    <>
      <RegisterForm />
      <Link href={"/login"}>Go to Log In page</Link>
    </>
  );
}
