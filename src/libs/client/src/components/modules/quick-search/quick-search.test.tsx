import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickSearch } from "./quick-search";
import { beforeAll, afterAll, vi } from "vitest";
import * as clientUtils from "@/client/utils";
import * as serverActions from "@/server/actions";

describe("Quick Search Component", () => {
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
    const closeButton = screen.queryByRole("button", { name: "Close" });
    expect(closeButton).not.toBeInTheDocument();
    expect(closeButton).toBeNull();
  });

  test("Search input box gets value from Local Storage in useEffect hook", () => {
    const useEffectSpy = vi.spyOn(clientUtils, "getSearchObjectFromLocalStorage");
    render(<QuickSearch></QuickSearch>);
    expect(useEffectSpy).toHaveBeenCalledTimes(1);
  });

  test("Search Results wrapper does not show when input field is empty and user presses Enter", async () => {
    const user = userEvent.setup();
    render(<QuickSearch></QuickSearch>);
    const inputBox = screen.getByRole("searchbox");
    expect(inputBox).toBeInTheDocument();
    await user.clear(inputBox);
    await user.keyboard("[Enter]");
    // @ts-ignore
    console.log("Input Value is: ", inputBox.value);
    const closeButton = screen.queryByRole("button", { name: "Close" });
    expect(closeButton).not.toBeInTheDocument();
  });

  test("Search Results wrapper shows when input field is not empty and user presses Enter", async () => {
    vi.spyOn(serverActions, "getQuickSearchResults").mockImplementation(async (search) => {
      return { success: true, data: [] };
    });
    const user = userEvent.setup();
    render(<QuickSearch></QuickSearch>);
    const inputBox = screen.getByRole("searchbox");
    expect(inputBox).toBeInTheDocument();
    await user.clear(inputBox);
    await user.type(inputBox, "Hello");
    await user.keyboard("[Enter]");
    // @ts-ignore
    console.log("Input Value is:", inputBox.value);
    const closeButton = screen.queryByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
  });

  test("No books found displayed when results array is empty", async () => {
    vi.spyOn(serverActions, "getQuickSearchResults").mockImplementation(async (search) => {
      return { success: true, data: [] };
    });
    const user = userEvent.setup();
    render(<QuickSearch></QuickSearch>);
    const inputBox = screen.getByRole("searchbox");
    expect(inputBox).toBeInTheDocument();
    await user.clear(inputBox);
    await user.type(inputBox, "Hello");
    await user.keyboard("[Enter]");
    // @ts-ignore
    console.log("Input Value is:", inputBox.value);
    const noBooksFoundElement = screen.getByText(/No books found/i);
    screen.debug(noBooksFoundElement);
    expect(noBooksFoundElement).toBeInTheDocument();
  });

  test.only("Display error message when result success is false", async () => {
    vi.spyOn(serverActions, "getQuickSearchResults").mockImplementation(async (search) => {
      return { success: false, errors: ["Error"], status: 500 };
    });
    const user = userEvent.setup();
    render(<QuickSearch></QuickSearch>);
    const inputBox = screen.getByRole("searchbox");
    expect(inputBox).toBeInTheDocument();
    await user.clear(inputBox);
    await user.type(inputBox, "Hello");
    await user.keyboard("[Enter]");
    // @ts-ignore
    console.log("Input Value is:", inputBox.value);
    const errorBlock = screen.getByText(/500/i);
    screen.debug(errorBlock);
  });
});
