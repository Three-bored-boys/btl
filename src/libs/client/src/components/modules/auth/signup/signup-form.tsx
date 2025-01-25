"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { Button } from "@/client/components/ui/button";
import { signupSchema, SignupFormState } from "@/libs/shared/src/schemas";
import { useRouter } from "next/navigation";
import { FormStatus } from "@/libs/shared/src/types";
import { fetchData, CustomAPIError } from "@/client/utils";
import { Spinner } from "@radix-ui/themes";
import { Check } from "@/client/components/ui/icons/check";

export function SignupForm() {
  const router = useRouter();
  const [signupFormState, setSignupFormState] = React.useState<SignupFormState>({
    fieldError: { userName: [], emailAddress: [], password: [] },
    formStatus: null,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateSignupFormState = async function (event: React.FormEvent<HTMLFormElement>): Promise<SignupFormState> {
    const formData = new FormData(event.currentTarget);
    const signupObj = Object.fromEntries(formData);

    const validation = signupSchema.safeParse(signupObj);

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
        formStatus: null,
      };
    }

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
        formStatus: { success: true, message: data },
      };
    } catch (e) {
      if (e instanceof CustomAPIError) {
        return {
          fieldError: { userName: [], emailAddress: [], password: [] },
          formStatus: { success: false, errors: e.errors },
        };
      }

      return {
        fieldError: { userName: [], emailAddress: [], password: [] },
        formStatus: { success: false, errors: ["Something went wrong. Please try again later."] },
      };
    }
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    setIsSubmitting(true);
    e.preventDefault();
    const newFormState = await updateSignupFormState(e);
    setSignupFormState(newFormState);

    if (newFormState.formStatus !== null) {
      if (!newFormState.formStatus.success) {
        setIsSubmitting(false);
        return;
      }
      router.push("/");
    } else {
      setIsSubmitting(false);
      return;
    }
  };

  const FormStatusMessage = function ({ formStatus }: { formStatus: FormStatus }) {
    if (formStatus.success) {
      return (
        <p className="flex items-center gap-x-0 text-success">
          <Check className="text-success" fill="#4ade80"></Check>
          {formStatus.message}
        </p>
      );
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {formStatus.errors.map((error, i) => (
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
        <Button background={"light"} type="submit" disabled={isSubmitting} textSize={"small"}>
          {isSubmitting ? (
            <span className="flex items-center justify-start gap-2">
              <span>Signing up...</span>
              <Spinner size={"1"}></Spinner>
            </span>
          ) : (
            <span>Sign up</span>
          )}
        </Button>
      </div>
      {signupFormState.formStatus !== null && (
        <FormStatusMessage formStatus={signupFormState.formStatus}></FormStatusMessage>
      )}
    </form>
  );
}
