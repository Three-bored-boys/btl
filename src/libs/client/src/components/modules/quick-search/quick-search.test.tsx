import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { QuickSearch } from "./quick-search";
import { beforeAll, afterAll, vi } from "vitest";
import * as clientUtils from "@/client/utils";

describe("Quick Search", () => {
  beforeAll(() => {
    console.log("Before all the tests");
  });

  afterAll(() => {
    vi.resetAllMocks();
    console.log("After all the tests");
  });
  test("Renders properly", async () => {
    render(<QuickSearch></QuickSearch>);
    const container = screen.getByTestId("quick-search-container");
    expect(container).toBeInTheDocument();
    const inputBox = screen.getByRole("searchbox");
    expect(inputBox).toBeInTheDocument();
  });

  test("Search input box gets value from Local Storage", () => {
    const useEffectSpy = vi.spyOn(clientUtils, "getSearchObjectFromLocalStorage");
    render(<QuickSearch></QuickSearch>);
    expect(useEffectSpy).toHaveBeenCalledOnce();
  });
});
