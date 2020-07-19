import React from "react";

import "./MainContainer.style.css";

export default function MainContainer({ children, ...props }) {
  return <div className="main-container">{children}</div>;
}
