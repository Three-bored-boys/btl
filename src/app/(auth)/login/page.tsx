import { ReactElement } from "react";
import { LoginForm } from "@/client/components/modules/auth/login/login-form";
import Link from "next/link";

export default function Login(): ReactElement {
  return (
    <>
      <LoginForm />
      <Link href={"/signup"}>Go to Sign Up page</Link>
    </>
  );
}
