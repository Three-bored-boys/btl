"use client";

import React from "react";
import { Logo } from "@/client/components/ui/logo";
import { cn } from "@/client/utils";
import { useAuthContext } from "@/client/providers/auth-context-provider";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const authLayoutImagesArray = React.useRef([
    "bg-auth-image-1",
    "bg-auth-image-2",
    "bg-auth-image-3",
    "bg-auth-image-4",
    "bg-auth-image-5",
  ]);
  const [authLayoutImageIndex, setAuthLayoutImageIndex] = React.useState<number | null>(null);
  const [bgImageClassName, setBgImageClassName] = React.useState<string>("");
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    const initialAuthLayoutImageIndex = Math.floor(Math.random() * authLayoutImagesArray.current.length);
    setAuthLayoutImageIndex(initialAuthLayoutImageIndex);
    setBgImageClassName(authLayoutImagesArray.current[initialAuthLayoutImageIndex]);
  }, []);

  if (user) {
    router.replace("/");
  }

  return (
    <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 md:grid-rows-[100vh]">
      <div
        className={cn("relative hidden bg-cover bg-center md:block", {
          "bg-gradient-to-b from-primary-50 to-secondary-50": bgImageClassName === "",
          [bgImageClassName]: bgImageClassName !== "",
        })}
      >
        <Logo
          className={cn("absolute left-5 top-5 text-5xl", {
            "text-white": authLayoutImageIndex === 0,
          })}
        />
      </div>
      <div className="h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
