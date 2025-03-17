"use client";

import React, { useActionState } from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { Check } from "@/client/components/ui/icons/check";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { ServerResult } from "@/shared/types";
import { SignupResult } from "@/shared/validators/auth";
import { useFormStatus } from "react-dom";
import { signUp } from "@/server/actions";

const Submit = function () {
  const { pending } = useFormStatus();

  return (
    <div>
      <SubmitButton
        isSubmitting={pending}
        defaultText={"Sign up"}
        submittingText={"Signing up..."}
        textSize={"small"}
        background={"light"}
      />
    </div>
  );
};

export function SignupForm({ redirect }: { redirect: string }) {
  const [signupFormState, signupAction] = useActionState(signUp, {
    fieldError: { userName: [], emailAddress: [], password: [] },
  });

  const ServerResultMessage = function ({ serverResult }: { serverResult: ServerResult<SignupResult> }) {
    if (serverResult.success) {
      return (
        <p className="flex items-center gap-x-0 text-success">
          <Check className="text-success" fill="#4ade80"></Check>
          {serverResult.data.message}
        </p>
      );
    } else {
      return (
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {serverResult.errors.map((error, i) => (
            <FormErrorListItem key={i}>{error}</FormErrorListItem>
          ))}
        </ul>
      );
    }
  };

  return (
    <form className="flex w-full flex-col" id="logInForm" action={signupAction}>
      <input type="hidden" name="redirect" value={redirect}></input>
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

      <Submit />
      {!("fieldError" in signupFormState) && <ServerResultMessage serverResult={signupFormState}></ServerResultMessage>}
    </form>
  );
}
