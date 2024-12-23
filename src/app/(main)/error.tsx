"use client";

import { Container } from "@/libs/client/src/components/layouts/container";
import { Button } from "@/libs/client/src/components/ui/button";
import { ErrorMessageObject } from "../../libs/client/src/utils";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const errorObj = JSON.parse(error.message) as ErrorMessageObject;
  error.digest = errorObj.message;

  return (
    <div>
      <Container>
        <h2>Something went wrong!</h2>
        <p>{errorObj.message}</p>
        <Button background={"dark"} onClick={() => reset()} textSize={"big"}>
          Try again
        </Button>
      </Container>
    </div>
  );
}
