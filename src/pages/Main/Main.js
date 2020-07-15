import React, { useState, useEffect } from "react";

import Card from "../../components/Card";
import api from "../../services/api";

import logo from "../../assets/logo_400x400.jpg";
import * as style from "./Main.styles";

export function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleClickRobots() {
    setLoading(true);
    const response = await api.get(`/all_robots`);
    setLoading(false);
    setData(response.data);

    localStorage.setItem("m0na_documents", JSON.stringify(response.data));
  }

  useEffect(() => {
    const storageData = localStorage.getItem("m0na_documents");

    if (storageData) {
      setData(JSON.parse(storageData));
    }
  }, []);

  return (
    <div style={style.main_content}>
      <button style={style.button} onClick={handleClickRobots}>
        RUN B0TS
      </button>
      <img style={style.m0na_logo} src={logo} alt="m0na-bot logo" />
      {loading ? <p>loading</p> : null}
      {data.map((d) => (
        <Card key={d.grupo} data={d} />
      ))}
      <div style={{ margin: 10 }}>
        <hr />
      </div>
    </div>
  );
}
