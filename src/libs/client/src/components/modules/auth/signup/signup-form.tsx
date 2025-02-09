"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { signupSchema, SignupFormState, SignupInput } from "@/root/src/libs/shared/src/validators";
import { useRouter } from "next/navigation";
import { FieldError } from "@/libs/shared/src/types";
import { Check } from "@/client/components/ui/icons/check";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { HandlerResult } from "@/shared/types/form-state";
import { SignupResult } from "@/shared/validators/auth";

export function SignupForm() {
  const router = useRouter();
  const [signupFormState, setSignupFormState] = React.useState<SignupFormState>({
    fieldError: { userName: [], emailAddress: [], password: [] },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateSignupFormState = async function (event: React.FormEvent<HTMLFormElement>): Promise<SignupFormState> {
    const formData = new FormData(event.currentTarget);
    const signupObjRaw = Object.fromEntries(formData);

    const validation = signupSchema.safeParse(signupObjRaw);

    if (!validation.success) {
      const errorObj: FieldError<SignupInput> = {
        fieldError: {
          userName: validation.error.issues
            .filter((issue) => issue.path[0] === "userName")
            .map((issue) => issue.message),
          emailAddress: validation.error.issues
            .filter((issue) => issue.path[0] === "emailAddress")
            .map((issue) => issue.message),
          password: validation.error.issues
            .filter((issue) => issue.path[0] === "password")
            .map((issue) => issue.message),
        },
      };
      throw errorObj;
    }

    const signupObj = validation.data;

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(signupObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = (await res.json()) as HandlerResult<SignupResult>;

    if (!res.ok) {
      throw result;
    }

    return result;
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newFormResult = await updateSignupFormState(e);
      setSignupFormState(newFormResult);
      setIsSubmitting(false);
      router.push("/");
    } catch (e) {
      const newFormState = e as SignupFormState;
      setSignupFormState(newFormState);
      setIsSubmitting(false);
    }
  };

  const FormResultMessage = function ({ formResult }: { formResult: HandlerResult<SignupResult> }) {
    if (formResult.formResult.success) {
      return (
        <p className="flex items-center gap-x-0 text-success">
          <Check className="text-success" fill="#4ade80"></Check>
          {formResult.formResult.data.message}
        </p>
      );
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {formResult.formResult.errors.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      );
    }
  };

  return (
    <form className="flex w-full flex-col" id="logInForm" onSubmit={(e) => void onSubmit(e)}>
      <div className="mb-6 flex flex-col">
        <Label htmlFor="userName">Username:</Label>
        <Input id="userName" type="text" name="userName" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {"fieldError" in signupFormState &&
            signupFormState.fieldError.userName.map((error, i) => (
              <FormErrorListItem key={i}>{error}</FormErrorListItem>
            ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="emailAddress">Email address:</Label>
        <Input id="emailAddress" type="email" name="emailAddress" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {"fieldError" in signupFormState &&
            signupFormState.fieldError.emailAddress.map((error, i) => (
              <FormErrorListItem key={i}>{error}</FormErrorListItem>
            ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" type="password" name="password" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {"fieldError" in signupFormState &&
            signupFormState.fieldError.password.map((error, i) => (
              <FormErrorListItem key={i}>{error}</FormErrorListItem>
            ))}
        </ul>
      </div>

      <div>
        <SubmitButton isSubmitting={isSubmitting} defaultText={"Sign up"} submittingText={"Signing up..."} />
      </div>
      {"formResult" in signupFormState && <FormResultMessage formResult={signupFormState}></FormResultMessage>}
    </form>
  );
}
