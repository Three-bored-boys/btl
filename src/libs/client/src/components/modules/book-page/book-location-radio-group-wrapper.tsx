import { getUserSession } from "@/server/actions";
import { getUserBookLibraryValue } from "@/server/actions/userBooks";
import { BookLocationRadioGroup } from "./book-location-radio-group";

export async function BookLocationRadioGroupWrapper({ isbn }: { isbn: string }) {
  const { user } = await getUserSession();
  if (!user) return null;
  const libraryValue = await getUserBookLibraryValue(isbn, user.id);

  return <BookLocationRadioGroup library={libraryValue} isbn={isbn}></BookLocationRadioGroup>;
}
