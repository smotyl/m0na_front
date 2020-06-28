import React, { useEffect, useState } from "react";
import api from "../../services/api";

import * as style from "./Card.styles";

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

  if (loading)
    return (
      <div id="card" style={style.card}>
        <p>loading</p>
      </div>
    );

  return (
    <ul id="document_list" style={style.document_list}>
      <div id="card" style={style.card} onClick={() => setShow(!show)}>
        <p>
          {title} ({data?.length})
        </p>
      </div>
      {show &&
        data.map((document) => (
          <li id="document_item" style={style.document_item}>
            <div id="card" style={style.card}>
              <a style={style.document_link} href={`${document.link}`}>
                {document.description}
              </a>
            </div>
          </li>
        ))}
    </ul>
  );
}
