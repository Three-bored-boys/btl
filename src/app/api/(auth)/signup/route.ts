import type { SignupInput } from "@/root/src/libs/shared/src/validators";
import { type NextRequest, NextResponse } from "next/server";
import { SignupResult } from "@/shared/validators/auth";
import { HandlerResult } from "@/root/src/libs/shared/src/types";
import { setCookieForBrowser } from "../utils";
import { fetchData } from "@/root/src/libs/client/src/utils";

export async function POST(req: NextRequest) {
  const signupInput = (await req.json()) as SignupInput;
  let response = new NextResponse<HandlerResult<SignupResult>>();
  try {
    const { fetchDataResult, res } = await fetchData<SignupResult>(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(signupInput),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!fetchDataResult.success) {
      response = NextResponse.json({ handlerResult: fetchDataResult }, { status: res.status });
      setCookieForBrowser(res, response);
      return response;
    }

    response = NextResponse.json({ handlerResult: fetchDataResult });
    setCookieForBrowser(res, response);
    return response;
  } catch (e) {
    response = NextResponse.json(
      { handlerResult: { success: false, errors: ["Something went wrong. Please try again."] } },
      {
        status: 500,
      },
    );
    return response;
  }
}
