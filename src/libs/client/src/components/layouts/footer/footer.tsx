import React from "react";
import NavLogo from "../../ui/logo";
import Container from "../container";

function Footer(): React.ReactElement {
  return (
    <footer className="mt-auto w-full py-5">
      <Container className="flex items-center justify-center gap-3">
        <NavLogo />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </Container>
    </footer>
  );
}

export default Footer;
