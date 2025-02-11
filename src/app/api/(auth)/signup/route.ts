import type { SignupInput } from "@/root/src/libs/shared/src/validators";
import { type NextRequest, NextResponse } from "next/server";
import { SignupResult } from "@/shared/validators/auth";
import { HandlerResult } from "@/root/src/libs/shared/src/types";
import { fetchData } from "@/root/src/libs/client/src/utils";

export async function POST(req: NextRequest) {
  const signupInput = (await req.json()) as SignupInput;
  let response = new NextResponse<HandlerResult<SignupResult>>();
  let setCookie: string | null = null;
  try {
    const { fetchDataResult, res: externalResponse } = await fetchData<SignupResult>(
      `${process.env.API_URL}/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(signupInput),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    setCookie = externalResponse.headers.get("set-cookie");

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    if (!fetchDataResult.success) {
      const { errors } = fetchDataResult;
      response = NextResponse.json(
        { handlerResult: { success: false, errors } },
        {
          status: externalResponse.status,
        },
      );

      return response;
    }

    const { data } = fetchDataResult;

    response = NextResponse.json({ handlerResult: { success: true, data } });

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
