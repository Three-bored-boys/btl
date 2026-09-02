import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ServerResult, Book } from "@/shared/types";
import { getCurrentlyReadingBooks } from "@/server/actions";

export async function GET(): Promise<NextResponse<ServerResult<Book[]>>> {
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

  const result = await getCurrentlyReadingBooks();

  if (!result.success) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result);
}
