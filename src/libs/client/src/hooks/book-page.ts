import { useEffect, useState } from "react";
import { fetchData } from "@/client/utils";
import { UserBook } from "@/shared/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BadResponse, GoodResponse } from "@/shared/types";

const getUserBookWithISBN = async function (isbn: string) {
  try {
    const { fetchDataResult, res } = await fetchData<{ book: UserBook[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/user-books/${isbn}`,
      { credentials: "include", method: "GET" },
    );

    if (res.status === 401 || !fetchDataResult.success) {
      return { libraryValue: null };
    }
    const {
      data: { book },
    } = fetchDataResult;

    if (book.length === 0) {
      return { libraryValue: null };
    }

    return { libraryValue: book[0].libraryValue };
  } catch (e) {
    return { libraryValue: null };
  }
};

const useGetUserBookWithISBN = function (isbn: string) {
  return useQuery({ queryKey: ["user-books", isbn], queryFn: () => getUserBookWithISBN(isbn) });
};

const addUserBookWithISBN = async function (isbn: string, library: string) {
  const { fetchDataResult, res } = await fetchData<string>(
    `${process.env.NEXT_PUBLIC_API_URL}/user-books/${isbn}/${library}`,
    {
      credentials: "include",
      method: "POST",
    },
  );

  if (res.status === 401) {
    throw new Error("User not authenticated");
  }

  return fetchDataResult;
};

const deleteUserBookWithISBN = async function (isbn: string) {
  const { fetchDataResult, res } = await fetchData<string>(`${process.env.NEXT_PUBLIC_API_URL}/user-books/${isbn}`, {
    credentials: "include",
    method: "DELETE",
  });

  if (res.status === 401) {
    throw new Error("User not authenticated");
  }

  return fetchDataResult;
};

export const useBookPage = function (isbn: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [libraryValue, setLibraryValue] = useState<string | null>(null);
  const [settledMessage, setSettledMessage] = useState<BadResponse | GoodResponse<string> | null>(null);

  const query = useGetUserBookWithISBN(isbn);

  const mutation = useMutation({
    mutationFn: (newLibraryValue: string | null) => {
      if (newLibraryValue) {
        return addUserBookWithISBN(isbn, newLibraryValue);
      }

      return deleteUserBookWithISBN(isbn);
    },
    onError: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["btl_session_user"], exact: true, refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: ["user-books", isbn], exact: true, refetchType: "all" }),
      ]);
      router.push("/login");
    },
    onSuccess: (data) => {
      setSettledMessage(data);
    },
  });

  useEffect(() => {
    if (query.data !== undefined) {
      setLibraryValue(query.data.libraryValue);
    }
  }, [query.data]);

  return { libraryValue, setLibraryValue, query, mutation, settledMessage, setSettledMessage };
};
