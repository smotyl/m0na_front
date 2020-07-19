import React from "react";

import "./BotCard.style.css";

export default function BotCard({ children, disabled, onClick, ...props }) {
  function handleClick() {
    if (!disabled) onClick();
    else return;
  }

  return (
    <div
      className={`bot-card ${disabled ? "disabled" : "enabled"}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
