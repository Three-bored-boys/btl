import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { HandlerResult } from "@/root/src/libs/shared/src/types";
import { NextResponse } from "next/server";

export const validateUser = async function () {
  const res = await fetch(`${process.env.URL}/api/validate-session`, {
    credentials: "include",
    headers: {},
  });

  const { handlerResult } = (await res.json()) as HandlerResult<SanitizedUser>;

  if (!handlerResult.success) {
    return null;
  }

  const { data } = handlerResult;
  console.log(data);
  return data;
};

export const setCookieForBrowser = function (incomingResponse: Response, outgoingResponse: NextResponse) {
  const setCookie = incomingResponse.headers.get("Set-Cookie");
  if (setCookie !== null) {
    outgoingResponse.headers.append("Set-Cookie", setCookie);
  }
};
