import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("About Page Unit Test Example", () => {
  test("should render without error, and has correct title", () => {
    const { debug } = render(<AboutPage />);
    const pageRoot = screen.queryByTestId("about-page-root");
    expect(pageRoot).toBeInTheDocument();
  });

  test("should render correct title", () => {
    const { debug } = render(<AboutPage />);
    const pageTitle = screen.queryByTestId("page-title-root");
    expect(pageTitle).toHaveTextContent("About Page");
  });
});
