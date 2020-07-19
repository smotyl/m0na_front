import React from "react";

import "./Modal.style.css";

function Modal({ children, visible, changeVisible, ...props }) {
  return (
    <div className={`modal-container ${visible ? "visible" : "hide"}`}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={changeVisible}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
