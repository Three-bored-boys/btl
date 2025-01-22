"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { Button } from "../../../ui/button";

export function LoginForm() {
  const onFormSubmission = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Logged In!");
  };

  return (
    <form className="flex w-full flex-col" id="logInForm" onSubmit={onFormSubmission}>
      <Label htmlFor="emailAddress">Email address:</Label>
      <Input id="emailAddress" type="email" className="mb-3" />

      <Label htmlFor="password">Password:</Label>
      <Input id="password" type="password" className="mb-3" />

      <Button background={"light"} type="submit" disabled={false} textSize={"big"}>
        Log In
      </Button>
    </form>
  );
}
