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
import { fetchData } from "@/client/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loginFormState, setLoginFormState] = React.useState<LoginFormState>({
    fieldError: { userName: [], password: [] },
  });

  const mutation = useMutation({
    mutationFn: async (loginObj: LoginInput) => {
      try {
        const { fetchDataResult } = await fetchData<LoginResult>(`/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(loginObj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return { serverResult: fetchDataResult } as ServerResult<LoginResult>;
      } catch (e) {
        return {
          serverResult: { success: false, errors: ["Something went wrong. Please try again."] },
        } as ServerResult<LoginResult>;
      }
    },
    onSuccess: async (data) => {
      setLoginFormState(data);
      if ("serverResult" in data && data.serverResult.success) {
        await queryClient.invalidateQueries({ queryKey: ["btl_session_user"], exact: true, refetchType: "all" });
        router.push("/");
      }
    },
  });

  const validateLoginInput = function (event: React.FormEvent<HTMLFormElement>): FieldError<LoginInput> | LoginInput {
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

    return validation.data;
  };

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationResult = validateLoginInput(e);
    if ("fieldError" in validationResult) {
      setLoginFormState(validationResult);
      return;
    }
    mutation.mutate(validationResult);
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
    <form className="flex w-full flex-col" id="logInForm" onSubmit={(e) => handleSubmit(e)}>
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
          isSubmitting={mutation.isPending}
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
