import { fetchData } from "@/root/src/libs/client/src/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { HandlerResult } from "@/root/src/libs/shared/src/types";
import { NextResponse } from "next/server";

export async function GET() {
  let response = new NextResponse<HandlerResult<SanitizedUser | null>>();
  let setCookie: string | null = null;

  try {
    const { fetchDataResult, res: externalResponse } = await fetchData<SanitizedUser>(
      `${process.env.API_URL}/auth/validate-session`,
      { credentials: "include" },
    );

    setCookie = externalResponse.headers.get("set-cookie");

    if (setCookie) {
      response.headers.set("Set-Cookie", setCookie);
    }

    if (!fetchDataResult.success) {
      response = NextResponse.json({ handlerResult: { success: true, data: null } });
      return response;
    }

    const { data } = fetchDataResult;
    response = NextResponse.json({ handlerResult: { success: true, data } });
    return response;
  } catch (e) {
    response = NextResponse.json({ handlerResult: { success: true, data: null } });
    return response;
  }
}
