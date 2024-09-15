import { ReactElement } from "react";
import LogInForm from "@/client/components/modules/auth/log-in/log-in-form";
import Link from "next/link";

export default function Login(): ReactElement {
  return (
    <>
      <LogInForm />
      <Link href={"/register"}>Go to Register page</Link>
    </>
  );
}
