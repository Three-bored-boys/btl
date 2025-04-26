import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, bookLibraryValues } from "@/shared/utils";
import * as z from "zod";
import { getUserSession, getUserBooksInALibrary } from "@/server/actions";
import { redirect } from "next/navigation";
import { CollectionLibrary } from "@/client/components/modules/collection/collection-library";
import { LinkButton } from "@/client/components/ui/link-button";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.webp";

export function generateStaticParams() {
  return bookLibraryValues.map((library) => ({ library }));
}

export default async function LibraryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ library: (typeof bookLibraryValues)[number] }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { user } = await getUserSession();

  if (!user) {
    redirect("/");
  }

  const [resolvedParams, resolvedSearchParams] = await Promise.all([paramsPromise, searchParamsPromise]);

  const { library: libraryParam } = resolvedParams;
  const validateLibrary = z.enum(bookLibraryValues).safeParse(libraryParam);
  if (!validateLibrary.success) {
    redirect("/collection");
  }
  const library = validateLibrary.data;

  const searchParams = new URLSearchParams(resolvedSearchParams);
  const page = searchParams.get("page");
  if (!page) {
    searchParams.set("page", (1).toString());
    redirect(`/collection/${library}/?${searchParams.toString()}`);
  }

  const pageNumber = Number(page);
  if (Number.isNaN(pageNumber) || pageNumber < DEFAULT_PAGE_NUMBER) {
    searchParams.set("page", (1).toString());
    redirect(`/collection/${library}/?${searchParams.toString()}`);
  }

  const result = await getUserBooksInALibrary({
    library,
    limit: DEFAULT_MAX_RESULTS,
    page: pageNumber,
    userId: user.id,
  });

  if (!result.success) {
    const { errors, status } = result;

    return (
      <div className="relative min-h-screen w-full">
        <div className="flex flex-col items-center justify-start gap-y-3 py-5">
          <p className="mb-3 text-8xl font-extralight md:mb-9 md:text-9xl">{status}</p>
          <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">Oops! Something has gone wrong!</h2>
          <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">{errors[0]}</p>
          <LinkButton href="/" background={"light"} textSize={"big"} className="mb-2">
            Return Home
          </LinkButton>
          <div>
            <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
          </div>
        </div>
      </div>
    );
  }

  const books = result.data;
  const isLastPage = books.length < DEFAULT_MAX_RESULTS;

  return <CollectionLibrary books={books} isLastPage={isLastPage} page={pageNumber} library={library} />;
}
