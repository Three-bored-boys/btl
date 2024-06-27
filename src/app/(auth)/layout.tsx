"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../libs/client/src/components/ui/logo";
import { cn } from "../../libs/client/src/utils";
import authLayoutImage1 from "@/public/assets/images/authPage/authLayout1.jpg";
import authLayoutImage2 from "@/public/assets/images/authPage/authLayout2.jpg";
import authLayoutImage3 from "@/public/assets/images/authPage/authLayout3.jpg";
import authLayoutImage4 from "@/public/assets/images/authPage/authLayout4.jpg";
import authLayoutImage5 from "@/public/assets/images/authPage/authLayout5.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const authLayoutImagesArray = [
    authLayoutImage1,
    authLayoutImage2,
    authLayoutImage3,
    authLayoutImage4,
    authLayoutImage5,
  ];
  const authLayoutImageIndex = React.useRef(Math.floor(Math.random() * authLayoutImagesArray.length));
  const layoutBackground = authLayoutImagesArray[authLayoutImageIndex.current];
  console.log(authLayoutImageIndex);

  return (
    <main className="grid w-full grid-cols-2 grid-rows-[100vh]">
      <div className="relative overflow-hidden">
        <Logo
          className={cn("absolute left-5 top-5 text-5xl", { "text-white": authLayoutImageIndex.current === 0 })}
        ></Logo>
        <Image
          src={layoutBackground}
          alt="Image about books"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        ></Image>
      </div>
      <div className="overflow-y-auto px-40 py-20">{children}</div>
    </main>
  );
}
