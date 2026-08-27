import { getUserBookLibraryValue } from "@/root/src/libs/server/src/actions/userBooks";
import { BookLocationRadioGroup } from "./book-location-radio-group";
import { type Book } from "@/shared/types";

export async function BookLocationRadioGroupWrapper({ isbn, book }: { isbn: string; book: Book }) {
  const libraryResponse = await getUserBookLibraryValue(isbn);
  return <BookLocationRadioGroup libraryResponse={libraryResponse} isbn={isbn} book={book} />;
}
