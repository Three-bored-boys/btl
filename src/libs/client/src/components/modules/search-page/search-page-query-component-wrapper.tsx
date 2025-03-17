import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/validators";
import React from "react";
import { SearchPageQueryComponent } from "./search-page-query-component";
import { getFullSearchResults } from "@/server/actions/books";
import { Container } from "@/client/components/layouts/container";
import { LinkButton } from "@/client/components/ui/link-button";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.webp";

export async function SearchPageQueryComponentWrapper({
  searchObject,
  paginationObject,
}: {
  searchObject: SearchObjectType;
  paginationObject: PaginationObjectType;
}) {
  const fetchDataResult = await getFullSearchResults({ ...searchObject, ...paginationObject });

  if (!fetchDataResult.success) {
    const { errors, status } = fetchDataResult;
    return (
      <div className="relative min-h-screen w-full">
        <Container>
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
        </Container>
      </div>
    );
  }

  return <SearchPageQueryComponent fullSearchResult={fetchDataResult.data} />;
}
