import React, { useState } from "react";

import "./Card.style.css";

export function Card({ data }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div id="card" className="card" onClick={() => setShow(!show)}>
        <p className="text">
          <strong>{data.grupo.toUpperCase()}</strong> ({data.list.length})
        </p>
      </div>
      {show && (
        <ul id="document_list" className="document_list">
          {data.list.map((document) => (
            <li
              key={document.url + document.description}
              id="document_item"
              className="document_item"
            >
              <a className="link" href={`${document.url}`}>
                {document.description}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
