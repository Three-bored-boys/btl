import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactElement } from "react";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { RadixProvider } from "./providers/radix-provider";
import { AuthContextProvider } from "./providers/auth-context-provider";
import { validateUser } from "./api/(auth)/utils";

export const metadata: Metadata = {
  title: "BTL (Book Tracker Library)",
  description: "A web application to view and store books in your library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  const user = await validateUser();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <RadixProvider>
            <AuthContextProvider initialUser={user}>
              <main>{children}</main>
            </AuthContextProvider>
          </RadixProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
