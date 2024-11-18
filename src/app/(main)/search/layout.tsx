import { ReactElement } from "react";
import { SearchPage } from "@/root/src/libs/client/src/components/layouts/search-page/search-page";

export const revalidate = 0;

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return <SearchPage>{children}</SearchPage>;
}
