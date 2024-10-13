import Container from "@/libs/client/src/components/layouts/container";
import SearchBar from "@/client/components/modules/search-bar/search-bar";
import { ReactElement } from "react";

export default function Search(): ReactElement {
  return (
    <div className="text-3xl">
      <Container>
        <SearchBar></SearchBar>
      </Container>
    </div>
  );
}
