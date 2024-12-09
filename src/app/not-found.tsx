import React from "react";
import { Container } from "../libs/client/src/components/layouts/container";
import { NavBar } from "../libs/client/src/components/layouts/navigation-bar/nav-bar";
import { Footer } from "../libs/client/src/components/layouts/footer/footer";
import { LinkButton } from "../libs/client/src/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <NavBar />
      <Container>
        <div>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <LinkButton href="/" background={"light"} textSize={"big"}>
            Return Home
          </LinkButton>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
