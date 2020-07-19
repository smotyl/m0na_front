import React from "react";

import "./BotContainer.style.css";

export default function BotContainer({ children, ...props }) {
  return <div className={"bot-container"}>{children}</div>;
}
