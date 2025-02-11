import { fetchData } from "@/client/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";

export const validateUser = async function () {
  const { fetchDataResult } = await fetchData<SanitizedUser | null>("/api/validate-session", {
    credentials: "include",
  });

  if (!fetchDataResult.success) {
    return null;
  }
  return fetchDataResult.data;
};
