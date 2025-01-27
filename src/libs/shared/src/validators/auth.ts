import { z } from "zod";
import { FormState } from "@/libs/shared/src/types";

export const signupSchema = z.object({
  userName: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .refine((userName) => !userName.includes(" "), "Username cannot contain spaces"),
  emailAddress: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address")
    .refine((email) => !email.includes(" "), "Email address cannot contain spaces"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(80, "Password must be at most 80 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character")
    .refine((password) => !password.includes(" "), "Password cannot contain spaces"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignupFormState = FormState<SignupInput>;
