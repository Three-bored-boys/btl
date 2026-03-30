import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/server/db/db";
import { getBookByISBN } from "@/server/actions/books";
import { ServerResult, Book } from "@/shared/types";
import { userBooks, users } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 3600;

export async function GET(): Promise<NextResponse<ServerResult<Book | null>>> {
  const headersList = await headers();

  const authorisationHeader = headersList.get("Authorization");
  if (!authorisationHeader) {
    return NextResponse.json({ success: false, errors: ["No authorisation!"], status: 401 }, { status: 401 });
  }

  const bearerAuthToken = authorisationHeader.split(" ")[1].trim();
  if (!bearerAuthToken) {
    return NextResponse.json({ success: false, errors: ["No authorisation!"], status: 401 }, { status: 401 });
  }

  if (bearerAuthToken !== process.env.BEARER_AUTH_TOKEN) {
    return NextResponse.json(
      { success: false, errors: ["No authorisation! Wrong token!"], status: 401 },
      { status: 401 },
    );
  }

  const bookISBNs = await db
    .select({ isbn: userBooks.isbn })
    .from(userBooks)
    .where(eq(userBooks.libraryValue, "currently-reading"))
    .innerJoin(users, eq(users.emailAddress, process.env.USER_EMAIL))
    .limit(1)
    .orderBy(desc(userBooks.updatedAt));

  if (bookISBNs.length === 0) {
    return NextResponse.json({ success: true, data: null });
  }

  const bookSearchRes = await getBookByISBN(bookISBNs[0].isbn);

  if (!bookSearchRes.success) {
    return NextResponse.json(bookSearchRes, { status: bookSearchRes.status });
  }

  return NextResponse.json(bookSearchRes);
}
