"use client";

import Container from "@/libs/client/src/components/layouts/container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.log(error.message);

  return (
    <div>
      <Container>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </Container>
    </div>
  );
}
