import type { SignupInput } from "@/root/src/libs/shared/src/validators";
import { type NextRequest } from "next/server";
import { SignupResult } from "@/shared/validators/auth";
import { fetchRouteHandler } from "../../utils";

export async function POST(req: NextRequest) {
  const signupInput = (await req.json()) as SignupInput;

  return await fetchRouteHandler<SignupResult>(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(signupInput),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
