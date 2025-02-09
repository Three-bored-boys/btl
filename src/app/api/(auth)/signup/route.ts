import { CustomAPIError, fetchData } from "@/root/src/libs/client/src/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import type { SignupInput } from "@/root/src/libs/shared/src/validators";
import { type NextRequest, NextResponse } from "next/server";
import { HandlerResult } from "@/shared/types/form-state";
import { SignupResult } from "@/shared/validators/auth";

export async function POST(req: NextRequest): Promise<NextResponse<HandlerResult<SignupResult>>> {
  try {
    const signupInput = (await req.json()) as SignupInput;
    const data = await fetchData<{ message: string; user: SanitizedUser }>(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(signupInput),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ formResult: { success: true, data } });
  } catch (e) {
    if (e instanceof CustomAPIError) {
      return NextResponse.json(
        { formResult: { success: false, errors: e.errors } },
        {
          status: e.status,
        },
      );
    }

    return NextResponse.json(
      { formResult: { success: false, errors: ["Something went wrong. Please try again later."] } },
      {
        status: 500,
      },
    );
  }
}
