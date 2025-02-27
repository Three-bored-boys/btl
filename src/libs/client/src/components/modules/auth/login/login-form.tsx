"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { FormErrorListItem } from "@/client/components/ui/form-error-list-item";
import { loginSchema, LoginFormState, LoginInput } from "@/root/src/libs/shared/src/validators";
import { useRouter } from "next/navigation";
import { FieldError } from "@/libs/shared/src/types";
import { Check } from "@/client/components/ui/icons/check";
import { SubmitButton } from "@/client/components/ui/submit-button";
import { ServerResult } from "@/shared/types";
import { LoginResult } from "@/shared/validators/auth";
import { fetchData } from "@/client/utils";
import { useAuthContext } from "@/client/hooks";

export function LoginForm() {
  const router = useRouter();
  const [loginFormState, setLoginFormState] = React.useState<LoginFormState>({
    fieldError: { userName: [], password: [] },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { setUser } = useAuthContext();

  const updateLoginFormState = async function (event: React.FormEvent<HTMLFormElement>): Promise<LoginFormState> {
    const formData = new FormData(event.currentTarget);
    const loginObjRaw = Object.fromEntries(formData);

    const validation = loginSchema.safeParse(loginObjRaw);

    if (!validation.success) {
      const fieldErrorObj: FieldError<LoginInput> = {
        fieldError: {
          userName: validation.error.issues
            .filter((issue) => issue.path[0] === "userName")
            .map((issue) => issue.message),
          password: validation.error.issues
            .filter((issue) => issue.path[0] === "password")
            .map((issue) => issue.message),
        },
      };
      return fieldErrorObj;
    }

    const loginObj = validation.data;

    try {
      const { fetchDataResult } = await fetchData<LoginResult>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return { serverResult: fetchDataResult };
    } catch (e) {
      return { serverResult: { success: false, errors: ["Something went wrong. Please try again."] } };
    }
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const newFormState = await updateLoginFormState(e);
    setLoginFormState(newFormState);
    setIsSubmitting(false);
    if ("serverResult" in newFormState && newFormState.serverResult.success) {
      setUser(newFormState.serverResult.data.user);
      router.push("/");
    }
  };

  const ServerResultMessage = function ({
    serverResult: { serverResult },
  }: {
    serverResult: ServerResult<LoginResult>;
  }) {
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
    <form className="flex w-full flex-col" id="logInForm" onSubmit={(e) => void onSubmit(e)}>
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

      <div>
        <SubmitButton
          isSubmitting={isSubmitting}
          defaultText={"Log In"}
          submittingText={"Logging in..."}
          textSize={"small"}
          background={"light"}
        />
      </div>
      {"serverResult" in loginFormState && <ServerResultMessage serverResult={loginFormState}></ServerResultMessage>}
    </form>
  );
}
