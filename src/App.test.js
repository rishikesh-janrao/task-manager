import { render, screen } from "@testing-library/react";
import App from "./App";

test("should have app title", async () => {
  render(<App />);
  const linkElement = screen.getByTestId("loader");
  expect(linkElement).toBeInTheDocument();
});
