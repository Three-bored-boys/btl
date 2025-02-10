import { NextResponse } from "next/server";
import { BadResponse, GoodResponse, HandlerResult } from "@/shared/types";

export const fetchRouteHandler = async function <T>(url: string, options?: RequestInit) {
  let response = new NextResponse<HandlerResult<T>>();
  let setCookie: string | null = null;
  try {
    const externalResponse = await fetch(url, options);

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

    const data = (await externalResponse.json()) as GoodResponse<T>;

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
};
