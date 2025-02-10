import { fetchData } from "@/client/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";

export const getUser = async function () {
  const apiURL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  const { fetchDataResult } = await fetchData<SanitizedUser>(`${apiURL}/auth/validate-session`);
  return fetchDataResult;
};
