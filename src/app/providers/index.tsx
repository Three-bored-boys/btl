"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Theme } from "@radix-ui/themes";

export default function Providers({ children }: { children: React.ReactNode }): React.ReactNode {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnMount: false } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>{children}</Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
