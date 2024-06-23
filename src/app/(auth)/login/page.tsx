import { ReactElement } from "react";
import Link from "next/link";

export default function LoginPage(): ReactElement {
  return (
    <main className="text-3xl">
      Log In
      <Link href={"/register"} className="ml-5">
        Register
      </Link>
    </main>
  );
}
