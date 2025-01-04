import { Book } from "@/root/src/libs/shared/src/types";
import React from "react";

type OverviewLibraryPreviewSectionProps = {
  name: string;
  slug: string;
  books: Book[];
} & React.ComponentProps<"section">;

export function OverviewLibraryPreviewSection({ name, slug, books, ...props }: OverviewLibraryPreviewSectionProps) {
  return <section {...props}>overview-library-preview-section</section>;
}
