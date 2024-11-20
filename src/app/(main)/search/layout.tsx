import { ReactElement, Suspense } from "react";
import { SearchPage } from "@/root/src/libs/client/src/components/layouts/search-page-layout/search-page-layout";

export const revalidate = 0;

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <Suspense fallback={<div>Yooo</div>}>
      <SearchPage>{children}</SearchPage>
    </Suspense>
  );
}
