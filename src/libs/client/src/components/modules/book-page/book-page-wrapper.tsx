import { Container } from "@/client/components/layouts/container";
import { LinkButton } from "@/client/components/ui/link-button";
import { BookInformation } from "./book-information";
import { BookLocationRadioGroupWrapper } from "./book-location-radio-group-wrapper";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.webp";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { getCachedBooksByISBN } from "@/server/actions";

export async function BookPageWrapper({ params: { isbn } }: { params: { isbn: string } }) {
  const fetchDataResult = await getCachedBooksByISBN(isbn);

  if (fetchDataResult.success) {
    const {
      data: [book],
    } = fetchDataResult;

    return (
      <div className="mt-5">
        <Container>
          <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-[11rem_1fr] sm:gap-7 sm:px-3 md:grid-cols-[12rem_1fr] md:gap-10 lg:grid-cols-[14.5rem_1fr] lg:gap-16 xl:grid-cols-[16rem_1fr] xl:gap-20 2xl:grid-cols-[18rem_1fr] 2xl:gap-28">
            <div className="mx-auto aspect-[10/16] w-2/4 border-[1px] border-gray-950 sm:w-full">
              <Image
                src={book.image || genericBookImage}
                alt={`${book.title} by ${book.author}`}
                className="mx-auto h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="truncate text-pretty">
              <div className="mb-3 flex items-center justify-center sm:block">
                {book.categories?.map((category, i) => (
                  <div key={i} className="inline-block rounded-xl bg-secondary-50 px-3 py-0.5 text-secondary-300">
                    {category}
                  </div>
                ))}
              </div>
              <h2 className="mb-3 text-center font-semibold sm:text-left">{book.title}</h2>
              <h3 className="mb-4 text-center italic sm:text-left">{book.author}</h3>
              <BookInformation book={book} />
              <BookLocationRadioGroupWrapper isbn={isbn} />
            </div>
          </div>
        </Container>
      </div>
    );
  }

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
