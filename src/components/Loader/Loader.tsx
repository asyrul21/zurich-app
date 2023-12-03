import React from "react";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "inherit",
        height: "inherit",
        padding: "52px 0",
      }}
      data-testid="loader-root"
    >
      <p>Loading...</p>
    </div>
  );
};
