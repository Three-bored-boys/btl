import { Container } from "@/root/src/libs/client/src/components/layouts/container";
import { ReactElement } from "react";

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div>
      <Container>Hello, this is {children}</Container>
    </div>
  );
}
