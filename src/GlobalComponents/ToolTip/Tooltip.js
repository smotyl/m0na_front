import React from "react";

import "./Tooltip.style.css";

export default function ToolTip({ children, disabled, text }) {
  return (
    <div className="tooltip">
      {!disabled && <span className="tooltip-text">{text}</span>}
      {children}
    </div>
  );
}
