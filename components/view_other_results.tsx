import { EuiButton } from "@elastic/eui";
import React from "react";

export function ViewOtherResults({ filterResults }) {
  return (
    <div className="toggle-results">
      <EuiButton
        onClick={() => filterResults(-1)}
        iconType="arrowLeft"
        size="s"
        className="prev-button"
      >
        Prev
      </EuiButton>
      <EuiButton
        className="latest-button"
        onClick={() => filterResults()}
        size="s"
      >
        Back to latest
      </EuiButton>
      <EuiButton
        onClick={() => filterResults(1)}
        iconType="arrowRight"
        iconSide="right"
        size="s"
        className="next-button"
      >
        Next
      </EuiButton>
    </div>
  );
}
