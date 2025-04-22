import { bookLibraryValues } from "@/shared/utils";
import { notFound } from "next/navigation";
import * as z from "zod";

export function generateStaticParams() {
  return bookLibraryValues.map((library) => ({ library }));
}

export default async function LibraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ library: (typeof bookLibraryValues)[number] }>;
  searchParams: Promise<{ page: string }>;
}) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const { library } = resolvedParams;
  const { page } = resolvedSearchParams;

  const validateLibrary = z.enum(bookLibraryValues).safeParse(library);
  if (!validateLibrary.success) {
    notFound();
  }

  const validLibrary = validateLibrary.data;

  return <div>{validLibrary}</div>;
}
