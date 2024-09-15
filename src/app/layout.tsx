import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactElement } from "react";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "BTL (Book Tracker Library)",
  description: "A web application to view and store books in your library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
