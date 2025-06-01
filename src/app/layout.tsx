import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactElement } from "react";
import { Wrapper } from "@/client/providers";

export const metadata: Metadata = {
  title: "BTL (Book Tracker Library)",
  description: "A web application to view and store books in your library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Wrapper>
          <main>{children}</main>
        </Wrapper>
      </body>
    </html>
  );
}
