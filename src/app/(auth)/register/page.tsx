import { ReactElement } from "react";
import Link from "next/link";

export default function RegisterPage(): ReactElement {
  return (
    <main className="text-3xl">
      Register
      <Link href={"/login"} className="ml-5">
        Login
      </Link>
    </main>
  );
}
