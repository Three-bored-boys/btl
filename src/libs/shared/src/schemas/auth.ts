import { z } from "zod";
import { FormState } from "@/libs/shared/src/types";

export const signupSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  emailAddress: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(80, "Password must be at most 80 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignupFormState = FormState<SignupInput>;
