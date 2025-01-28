"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { signupSchema, SignupFormState } from "@/root/src/libs/shared/src/validators";
import { useRouter } from "next/navigation";
import { FormResult } from "@/libs/shared/src/types";
import { fetchData, CustomAPIError } from "@/client/utils";
import { Check } from "@/client/components/ui/icons/check";
import { SubmitButton } from "@/client/components/ui/submit-button";

export function SignupForm() {
  const router = useRouter();
  const [signupFormState, setSignupFormState] = React.useState<SignupFormState>({
    fieldError: { userName: [], emailAddress: [], password: [] },
    formResult: null,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateSignupFormState = async function (event: React.FormEvent<HTMLFormElement>): Promise<SignupFormState> {
    const formData = new FormData(event.currentTarget);
    const signupObjRaw = Object.fromEntries(formData);

    const validation = signupSchema.safeParse(signupObjRaw);

    if (!validation.success) {
      return {
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
        formResult: null,
      };
    }

    const signupObj = validation.data;

    try {
      const data = await fetchData<string>(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        fieldError: { userName: [], emailAddress: [], password: [] },
        formResult: { success: true, message: data },
      };
    } catch (e) {
      if (e instanceof CustomAPIError) {
        return {
          fieldError: { userName: [], emailAddress: [], password: [] },
          formResult: { success: false, errors: e.errors },
        };
      }

      return {
        fieldError: { userName: [], emailAddress: [], password: [] },
        formResult: { success: false, errors: ["Something went wrong. Please try again later."] },
      };
    }
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const delay = (durationMs: number) => {
      return new Promise((resolve) => setTimeout(resolve, durationMs));
    };

    // ... elsewhere
    await delay(1000);

    const newFormState = await updateSignupFormState(e);
    setSignupFormState(newFormState);

    if (newFormState.formResult !== null) {
      if (newFormState.formResult.success) {
        router.push("/");
      }
    }
    setIsSubmitting(false);
  };

  const FormResultMessage = function ({ formResult }: { formResult: FormResult }) {
    if (formResult.success) {
      return (
        <p className="flex items-center gap-x-0 text-success">
          <Check className="text-success" fill="#4ade80"></Check>
          {formResult.message}
        </p>
      );
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {formResult.errors.map((error, i) => (
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
          {signupFormState.fieldError.userName.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="emailAddress">Email address:</Label>
        <Input id="emailAddress" type="email" name="emailAddress" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {signupFormState.fieldError.emailAddress.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" type="password" name="password" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {signupFormState.fieldError.password.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      </div>

      <div>
        <SubmitButton isSubmitting={isSubmitting} defaultText={"Sign up"} submittingText={"Signing up..."} />
      </div>
      {signupFormState.formResult !== null && (
        <FormResultMessage formResult={signupFormState.formResult}></FormResultMessage>
      )}
    </form>
  );
}
