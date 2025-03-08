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
import { ServerResult } from "@/shared/types";
import { SignupResult } from "@/shared/validators/auth";
import { fetchData } from "@/client/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function SignupForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [signupFormState, setSignupFormState] = React.useState<SignupFormState>({
    fieldError: { userName: [], emailAddress: [], password: [] },
  });

  const mutation = useMutation({
    mutationFn: async (signupObj: SignupInput) => {
      try {
        const { fetchDataResult } = await fetchData<SignupResult>(`/api/auth/signup`, {
          method: "POST",
          body: JSON.stringify(signupObj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return { serverResult: fetchDataResult } as ServerResult<SignupResult>;
      } catch (e) {
        return {
          serverResult: { success: false, errors: ["Something went wrong. Please try again."] },
        } as ServerResult<SignupResult>;
      }
    },
    onSuccess: async (data) => {
      setSignupFormState(data);
      if ("serverResult" in data && data.serverResult.success) {
        await queryClient.invalidateQueries({ queryKey: ["btl_session_user"], exact: true, refetchType: "all" });
        router.push("/");
      }
    },
  });

  const validateSignupInput = function (
    event: React.FormEvent<HTMLFormElement>,
  ): SignupInput | FieldError<SignupInput> {
    const formData = new FormData(event.currentTarget);
    const signupObjRaw = Object.fromEntries(formData);

    const validation = signupSchema.safeParse(signupObjRaw);

    if (!validation.success) {
      const fieldErrorObj: FieldError<SignupInput> = {
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
      return fieldErrorObj;
    }

    return validation.data;
  };

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationResult = validateSignupInput(e);
    if ("fieldError" in validationResult) {
      setSignupFormState(validationResult);
      return;
    }
    mutation.mutate(validationResult);
  };

  const ServerResultMessage = function ({
    serverResult: { serverResult },
  }: {
    serverResult: ServerResult<SignupResult>;
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
        <SubmitButton
          isSubmitting={mutation.isPending}
          defaultText={"Sign up"}
          submittingText={"Signing up..."}
          textSize={"small"}
          background={"light"}
        />
      </div>
      {"serverResult" in signupFormState && <ServerResultMessage serverResult={signupFormState}></ServerResultMessage>}
    </form>
  );
}
