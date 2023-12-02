import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";

// modules to mock
import * as navModule from "next/navigation";

describe("Header Component Unit Tests", () => {
  beforeEach(() => {
    // jest.spyOn(navModule, "usePathname").mockImplementation(() => {
    //   return "/about";
    // });
    jest.mock("next/navigation");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render without crashing", () => {
    const { debug } = render(<Header />);
    // debug();
    const component = screen.queryByTestId("header-root");
    expect(component).toBeInTheDocument();
  });

  test("should apply active class", () => {
    const { debug } = render(<Header />);
    // debug();
    const component = screen.queryByTestId("nav-link-about");
    expect(component).toHaveClass("container_navbar_link_active");
  });
});
