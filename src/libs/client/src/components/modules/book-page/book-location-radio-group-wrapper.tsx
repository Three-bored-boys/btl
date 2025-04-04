import { getUserSession } from "@/server/actions";
import { getUserBookLibraryValue } from "@/root/src/libs/server/src/actions/userBooks";
import { BookLocationRadioGroup } from "./book-location-radio-group";

const getLibraryValue = async function (isbn: string) {
  "use server";
  const { user } = await getUserSession();
  if (!user) return null;
  return await getUserBookLibraryValue(isbn, user.id);
};

export async function BookLocationRadioGroupWrapper({ isbn }: { isbn: string }) {
  const libraryValue = await getLibraryValue(isbn);

  return <BookLocationRadioGroup library={libraryValue} isbn={isbn}></BookLocationRadioGroup>;
}
