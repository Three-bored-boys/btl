import { getUserBookLibraryValue } from "@/root/src/libs/server/src/actions/userBooks";
import { BookLocationRadioGroup } from "./book-location-radio-group";

export async function BookLocationRadioGroupWrapper({ isbn }: { isbn: string }) {
  const libraryResponse = await getUserBookLibraryValue(isbn);
  return <BookLocationRadioGroup libraryResponse={libraryResponse} isbn={isbn}></BookLocationRadioGroup>;
}
