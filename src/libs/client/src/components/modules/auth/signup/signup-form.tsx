"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormFieldErrorListItem } from "@/client/components/ui/form-field-error-list-item";
import { Button } from "@/client/components/ui/button";
import { signupSchema, SignupFormState } from "@/libs/shared/src/schemas";
import { useRouter } from "next/navigation";
import { FormStatus } from "@/libs/shared/src/types";

export function SignupForm() {
  const router = useRouter();
  const [signupFormState, setSignupFormState] = React.useState<SignupFormState>({
    fieldError: { userName: [], emailAddress: [], password: [] },
    formStatus: null,
  });

  const updateSignupFormState = function (event: React.FormEvent<HTMLFormElement>): SignupFormState {
    event.preventDefault();
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

    return {
      fieldError: { userName: [], emailAddress: [], password: [] },
      formStatus: { success: true, message: "Success!" },
    };
  };

  const onSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    const newFormState = updateSignupFormState(e);
    setSignupFormState(newFormState);

    if (!newFormState.formStatus?.success) {
      return;
    }

    router.push("/");
  };

  const FormStatusMessage = function ({ formStatus }: { formStatus: FormStatus }) {
    if (formStatus.success) {
      return <p>{formStatus.message}</p>;
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {formStatus.errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <form
      className="flex w-full flex-col"
      id="logInForm"
      onSubmit={onSubmit}
      onChange={(e) => setSignupFormState(updateSignupFormState(e))}
    >
      <div className="mb-6 flex flex-col">
        <Label htmlFor="userName">Username:</Label>
        <Input id="userName" type="text" name="userName" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {signupFormState.fieldError.userName.map((error, i) => (
            <FormFieldErrorListItem key={i}>{error}</FormFieldErrorListItem>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="emailAddress">Email address:</Label>
        <Input id="emailAddress" type="email" name="emailAddress" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {signupFormState.fieldError.emailAddress.map((error, i) => (
            <FormFieldErrorListItem key={i}>{error}</FormFieldErrorListItem>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" type="password" name="password" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {signupFormState.fieldError.password.map((error, i) => (
            <FormFieldErrorListItem key={i}>{error}</FormFieldErrorListItem>
          ))}
        </ul>
      </div>

      <div>
        <Button background={"light"} type="submit" disabled={false} textSize={"big"}>
          Sign Up
        </Button>
      </div>
      {signupFormState.formStatus !== null && (
        <FormStatusMessage formStatus={signupFormState.formStatus}></FormStatusMessage>
      )}
    </form>
  );
}
