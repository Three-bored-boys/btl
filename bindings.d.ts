import { SanitizedUser } from "./src/libs/shared/src/db/schema";
export type Environment = {
  Variables: {
    user: SanitizedUser;
  };
};
