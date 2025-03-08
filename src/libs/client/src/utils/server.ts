"use server";

import { headers } from "next/headers";

const getBaseServerUrl = function () {
  if (process.env.NODE_ENV === "development") {
    return Promise.resolve("http://localhost:3000");
  }
  const host = headers().get("host");
  const protocol = "https";
  return Promise.resolve(`${protocol}://${host!}`);
};

export const apiUrl = async function () {
  console.log(getBaseServerUrl());
  return (await getBaseServerUrl()) + "/api";
};
