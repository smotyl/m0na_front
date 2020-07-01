import React, { useEffect, useState } from "react";
import api from "../../services/api";

// import * as style from "./Card.styles";
import "./Card.style.css";

// const mock = [
//   {
//     link:
//       "https://www.al.sp.gov.br/propositura/acessorio/?idDocumento=1000326140&tpDocumento=14",
//     description:
//       "Emenda de Pauta 811/2020, de 02/06/2020 - Projeto de lei 307/2020",
//   },
//   {
//     link:
//       "https://www.al.sp.gov.br/propositura/acessorio/?idDocumento=1000324752&tpDocumento=14",
//     description:
//       "Emenda de Pauta 231/2020, de 22/05/2020 - Projeto de lei 350/2020",
//   },
//   {
//     link:
//       "https://www.al.sp.gov.br/propositura/acessorio/?idDocumento=1000324751&tpDocumento=14",
//     description:
//       "Emenda de Pauta 230/2020, de 22/05/2020 - Projeto de lei 350/2020",
//   },
// ];

export function Card({ title, entity }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await api.get(`/${entity}`);
      setLoading(false);
      setData(response.data);
    }

    getData();
  }, [entity]);

  if (loading) return <p className="text">loading {entity}</p>;

  return (
    <>
      <div id="card" className="card" onClick={() => setShow(!show)}>
        <p className="text">
          <strong>{title.toUpperCase()}</strong> ({data?.length})
        </p>
      </div>
      {show && (
        <ul id="document_list" className="document_list">
          {data.map((document) => (
            <li id="document_item" className="document_item">
              <a className="link" href={`${document.link}`}>
                {document.description}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
