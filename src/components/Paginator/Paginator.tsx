import React from "react";
import classnames from "classnames";

import "./Paginator.scss";

export interface IPaginatorProps {
  currentPage: number;
  totalPages: number;
  onChange?: (val: number) => void;
}

export const Paginator = ({
  currentPage,
  totalPages,
  onChange,
}: IPaginatorProps) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return (
    <div className="paginator_container" data-testid="paginator-root">
      <span className="paginator_label">Page:</span>
      {hasPrev && currentPage - 1 > 0 && (
        <button
          data-testid="paginator-prev"
          className="paginator_btn paginator_prev"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onChange === "function") {
              onChange(currentPage - 1);
            }
          }}
        >
          Prev
        </button>
      )}
      <span data-testid="paginator-text">
        {currentPage} out of {totalPages}
      </span>
      {hasNext && (
        <button
          data-testid="paginator-next"
          className="paginator_btn paginator_next"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onChange === "function") {
              onChange(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
