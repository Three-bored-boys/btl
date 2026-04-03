"use client";

import { ImageKitProvider as ImgKitProvider } from "@imagekit/next";
import React from "react";

export function ImageKitProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  return <ImgKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>{children}</ImgKitProvider>;
}
