import { ReactElement, Suspense } from "react";
import { SearchPageLayout } from "@/root/src/libs/client/src/components/layouts/search-page-layout/search-page-layout";

export const revalidate = 0;

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <Suspense fallback={<div>Yooo</div>}>
      <SearchPageLayout>{children}</SearchPageLayout>
    </Suspense>
  );
}
