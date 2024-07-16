"use client";

import React from "react";
import Logo from "../../libs/client/src/components/ui/logo";
import { cn } from "../../libs/client/src/utils";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const authLayoutImagesArray = [
    "bg-auth-image-1",
    "bg-auth-image-2",
    "bg-auth-image-3",
    "bg-auth-image-4",
    "bg-auth-image-5",
  ];

  const authLayoutImageIndex = React.useRef(Math.floor(Math.random() * authLayoutImagesArray.length));
  const bgImageClassName = authLayoutImagesArray[authLayoutImageIndex.current];

  return (
    <main className="grid w-full grid-cols-2 grid-rows-[100vh]">
      <div className={cn("relative bg-cover bg-center", bgImageClassName)}>
        <Logo className={cn("absolute left-5 top-5 text-5xl", { "text-white": authLayoutImageIndex.current === 0 })} />
      </div>
      <div className="overflow-y-auto px-40 py-20">{children}</div>
    </main>
  );
}
