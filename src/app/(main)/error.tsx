"use client";

import { Container } from "@/libs/client/src/components/layouts/container";
import { Button } from "@/libs/client/src/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <Container>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <Button background={"dark"} onClick={() => reset()} textSize={"big"}>
          Try again
        </Button>
      </Container>
    </div>
  );
}
