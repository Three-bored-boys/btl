import { z } from "zod";
import { FormState } from "@/libs/shared/src/types";
import { SanitizedUser } from "@/shared/db/schema";

// Signup Schema
const userNameSchema = z
  .string({ required_error: "Username is required" })
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .refine((userName) => !userName.includes(" "), "Username cannot contain spaces");

const emailAddressSchema = z
  .string({ required_error: "Email address is required" })
  .email("Invalid email address")
  .refine((email) => !email.includes(" "), "Email address cannot contain spaces");

const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(80, "Password must be at most 80 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character")
  .refine((password) => !password.includes(" "), "Password cannot contain spaces");

export const signupSchema = z.object({
  userName: userNameSchema,
  emailAddress: emailAddressSchema,
  password: passwordSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignupResult = { message: string; user: SanitizedUser };
export type SignupFormState = FormState<SignupInput, SignupResult>;

// Login Schema
export const loginSchema = z.object({ userName: userNameSchema, password: passwordSchema });

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginResult = SignupResult;
export type LoginFormState = FormState<LoginInput, LoginResult>;
