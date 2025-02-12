import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { BadResponse, GoodResponse, HandlerResult } from "@/root/src/libs/shared/src/types";
import { NextResponse, type NextRequest } from "next/server";
import { setCookieForBrowser } from "../utils";

export async function GET(req: NextRequest) {
  console.log(req.cookies.get("btl_auth_session"));
  let response = new NextResponse<HandlerResult<SanitizedUser>>();

  try {
    const res = await fetch(`${process.env.API_URL}/auth/validate-session`, { credentials: "include" });

    if (!res.ok) {
      const result = (await res.json()) as BadResponse;
      response = NextResponse.json({ handlerResult: result }, { status: res.status });
      setCookieForBrowser(res);
      return response;
    }

    const data = (await res.json()) as GoodResponse<SanitizedUser>;
    response = NextResponse.json({ handlerResult: data });
    setCookieForBrowser(res);
    return response;
  } catch (e) {
    response = NextResponse.json(
      {
        handlerResult: { success: false, errors: ["Something went wrong. Please try again."] },
      },
      { status: 500 },
    );
    return response;
  }
}
