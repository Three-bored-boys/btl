"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { Check } from "@/client/components/ui/icons/check";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { ServerResult } from "@/shared/types";
import { LoginResult } from "@/shared/validators/auth";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/server/actions";
import { useSearchParams } from "next/navigation";

const Submit = function () {
  const { pending } = useFormStatus();

  return (
    <div>
      <SubmitButton
        isSubmitting={pending}
        defaultText={"Log In"}
        submittingText={"Logging in..."}
        textSize={"small"}
        background={"light"}
      />
    </div>
  );
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "";
  const [loginFormState, loginAction] = useFormState(login, {
    fieldError: { userName: [], password: [] },
  });

  const ServerResultMessage = function ({ serverResult }: { serverResult: ServerResult<LoginResult> }) {
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
    <form className="flex w-full flex-col" id="logInForm" action={loginAction}>
      <input type="hidden" name="redirect" value={redirect}></input>
      <div className="mb-6 flex flex-col">
        <Label htmlFor="userName">Username:</Label>
        <Input id="userName" type="text" name="userName" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {"fieldError" in loginFormState &&
            loginFormState.fieldError.userName.map((error, i) => (
              <FormErrorListItem key={i}>{error}</FormErrorListItem>
            ))}
        </ul>
      </div>

      <div className="mb-6 flex flex-col">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" type="password" name="password" />
        <ul style={{ listStyle: "disc", listStylePosition: "outside" }}>
          {"fieldError" in loginFormState &&
            loginFormState.fieldError.password.map((error, i) => (
              <FormErrorListItem key={i}>{error}</FormErrorListItem>
            ))}
        </ul>
      </div>

      <Submit />
      {!("fieldError" in loginFormState) && <ServerResultMessage serverResult={loginFormState}></ServerResultMessage>}
    </form>
  );
}
