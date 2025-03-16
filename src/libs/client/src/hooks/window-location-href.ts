"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useWindowLocationHref = function () {
  const [href, setHref] = React.useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (window) {
      setHref(window.location.href);
    }
  }, [pathname, searchParams]);

  return href;
};
