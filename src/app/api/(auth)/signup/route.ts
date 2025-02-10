import type { SignupInput } from "@/root/src/libs/shared/src/validators";
import { type NextRequest, NextResponse } from "next/server";
import { BadResponse, GoodResponse, HandlerResult } from "@/shared/types";
import { SignupResult } from "@/shared/validators/auth";

export async function POST(req: NextRequest): Promise<NextResponse<HandlerResult<SignupResult>>> {
  let response = new NextResponse<HandlerResult<SignupResult>>();
  let setCookie: string | null = null;
  const signupInput = (await req.json()) as SignupInput;
  try {
    const externalResponse = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(signupInput),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    setCookie = externalResponse.headers.get("set-cookie");

    if (!externalResponse.ok) {
      const errorObj = (await externalResponse.json()) as BadResponse;

      response = NextResponse.json(
        { handlerResult: errorObj },
        {
          status: externalResponse.status,
        },
      );

      if (setCookie) {
        response.headers.set("set-cookie", setCookie);
      }

      return response;
    }

    const data = (await externalResponse.json()) as GoodResponse<SignupResult>;

    response = NextResponse.json({ handlerResult: data });

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

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
