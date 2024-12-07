"use client";

import React from "react";
import { Label } from "@/client/components/ui/label";
import { Input } from "@/client/components/ui/input";
import { Button } from "../../../ui/button";

export function RegisterForm() {
  const onFormSubmission = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Registered!");
  };

  return (
    <form className="flex w-full flex-col" id="logInForm" onSubmit={onFormSubmission}>
      <Label htmlFor="firstName">First Name:</Label>
      <Input id="firstName" type="text" className="mb-3" />

      <Label htmlFor="middleName">Middle Name&#40;s&#41;:</Label>
      <Input id="middleName" type="text" className="mb-3" />

      <Label htmlFor="lastName">Last Name:</Label>
      <Input id="lastName" type="text" className="mb-3" />

      <Label htmlFor="userName">User Name:</Label>
      <Input id="userName" type="text" className="mb-3" />

      <Label htmlFor="emailAddress">Email address:</Label>
      <Input id="emailAddress" type="email" className="mb-3" />

      <Label htmlFor="password">Password:</Label>
      <Input id="password" type="password" className="mb-3" />

      <Button background={"light"} type="submit" disabled={false} textSize={"big"}>
        Register
      </Button>
    </form>
  );
}
