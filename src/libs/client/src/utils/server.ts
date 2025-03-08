import { headers } from "next/headers";

export const getBaseServerUrl = function () {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  const host = headers().get("host");
  const protocol = "https";
  return `${protocol}://${host!}`;
};

export const apiUrl = function () {
  console.log(getBaseServerUrl());
  return getBaseServerUrl() + "/api";
};
