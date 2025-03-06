import React from "react";
import { Logo } from "@/client/components/ui/logo";
import { Container } from "../container";

export function Footer(): React.ReactElement {
  return (
    <footer className="mt-auto w-full border-t border-t-secondary-100 py-5">
      <Container className="flex items-center justify-center gap-3">
        <Logo />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </Container>
    </footer>
  );
}
