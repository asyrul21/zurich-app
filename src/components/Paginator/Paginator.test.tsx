import { fireEvent, render, screen } from "@testing-library/react";
import { Paginator } from "./Paginator";

describe("Paginator Component Unit Tests", () => {
  test("should render without crashing", () => {
    const { debug } = render(<Paginator currentPage={1} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-root");
    expect(component).toBeInTheDocument();
  });

  test("should not show previous button when currentPage is 1", () => {
    const { debug } = render(<Paginator currentPage={1} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-prev");
    expect(component).not.toBeInTheDocument();
  });

  test("should show previous button when currentPage is more than 1", () => {
    const { debug } = render(<Paginator currentPage={2} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-prev");
    expect(component).toBeInTheDocument();
  });

  test("should execute onChange with correct value when prev button clicked", () => {
    const mockOnChange = jest.fn();

    const { debug } = render(
      <Paginator currentPage={2} totalPages={2} onChange={mockOnChange} />,
    );
    // debug();
    const component = screen.queryByTestId("paginator-prev");
    component?.click();
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  test("should not show next button when currentPage is last page", () => {
    const { debug } = render(<Paginator currentPage={2} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-next");
    expect(component).not.toBeInTheDocument();
  });

  test("should show next button when currentPage is less than total pages", () => {
    const { debug } = render(<Paginator currentPage={1} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-next");
    expect(component).toBeInTheDocument();
  });

  test("should execute onChange with correct value when next button clicked", () => {
    const mockOnChange = jest.fn();

    const { debug } = render(
      <Paginator currentPage={1} totalPages={2} onChange={mockOnChange} />,
    );
    // debug();
    const component = screen.queryByTestId("paginator-next");
    component?.click();
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  test("should show correct text", () => {
    const { debug } = render(<Paginator currentPage={1} totalPages={2} />);
    // debug();
    const component = screen.queryByTestId("paginator-text");
    expect(component).toHaveTextContent("1 out of 2");
  });
});
