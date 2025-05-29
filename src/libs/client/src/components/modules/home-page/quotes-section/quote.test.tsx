import { Quote } from "./quote";
import { render, screen } from "@testing-library/react";

test("Main Test", () => {
  render(<Quote author="Michael Gallaway" quote="He who conquers"></Quote>);
  const quoteEl = screen.getByText(/He who/i);
  console.log(quoteEl.outerHTML);
  expect(quoteEl).toBeVisible();
});
