import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactElement } from "react";
import {
  ReactQueryProvider,
  RadixProvider,
  AuthContextProvider,
  MobileMenuContextProvider,
  RootPathnameContextProvider,
} from "@/client/providers";
import { getUserSession } from "@/server/actions";

export const metadata: Metadata = {
  title: "BTL (Book Tracker Library)",
  description: "A web application to view and store books in your library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  const { user } = await getUserSession();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <RadixProvider>
            <AuthContextProvider initialUser={user}>
              <RootPathnameContextProvider>
                <MobileMenuContextProvider>
                  <main>{children}</main>
                </MobileMenuContextProvider>
              </RootPathnameContextProvider>
            </AuthContextProvider>
          </RadixProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
