import { CustomAPIError, fetchData } from "@/client/utils";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";

export const getUser = async function () {
  const apiURL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  try {
    const user = await fetchData<SanitizedUser>(`${apiURL}/auth/validate-session`);
    return user;
  } catch (e) {
    if (e instanceof CustomAPIError) {
      return null;
    }
    throw e;
  }
};
