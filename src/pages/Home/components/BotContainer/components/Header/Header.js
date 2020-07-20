import React from "react";

import "./Header.style.css";

export default function Header({ children, ...props }) {
  return <div className="bot-container-header">{children}</div>;
}
