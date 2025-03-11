import { AuthLayout } from "@/client/components/layouts/auth/auth-layout";
import { getUserSession } from "../../libs/server/src/auth/utils";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserSession();
  if (user) redirect("/");

  return <AuthLayout>{children}</AuthLayout>;
}
