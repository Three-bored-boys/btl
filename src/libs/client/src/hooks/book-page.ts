import { useEffect, useState } from "react";
import { fetchData } from "@/client/utils";
import { SanitizedUser, UserBook } from "@/shared/db/schema";
import { useAuthContext } from "./auth";
import { useQuery } from "@tanstack/react-query";

const getUserBookWithISBN = async function (isbn: string) {
  try {
    const { fetchDataResult, res } = await fetchData<{ user: SanitizedUser; book: UserBook[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/user-books/${isbn}`,
      { credentials: "include", method: "GET" },
    );

    if (res.status === 401 || !fetchDataResult.success) {
      return { user: null, libraryValue: null };
    }
    const {
      data: { user, book },
    } = fetchDataResult;

    if (book.length === 0) {
      return { user, libraryValue: null };
    }

    return { user, libraryValue: book[0].libraryValue };
  } catch (e) {
    return { user: null, libraryValue: null };
  }
};

const useGetUserBookWithISBN = function (isbn: string) {
  return useQuery({ queryKey: ["user-books", isbn], queryFn: () => getUserBookWithISBN(isbn) });
};

export const useBookPage = function (isbn: string) {
  const [libraryValue, setLibraryValue] = useState<string | null>(null);
  const { setUser, user } = useAuthContext();
  const query = useGetUserBookWithISBN(isbn);

  useEffect(() => {
    if (query.data !== undefined) {
      setUser(query.data.user);
      setLibraryValue(query.data.libraryValue);
    }
  }, [query.data]);

  return { libraryValue, setLibraryValue, query, setUser, user };
};
