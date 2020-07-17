import React, { useState, useEffect } from "react";

import Card from "../../components/Card";
import api from "../../services/api";

import logo from "../../assets/logo_400x400.jpg";
import * as style from "./Main.styles";

export function Main() {
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getToday() {
    setLoading(true);
    const response = await api.get(`/today`);
    setLoading(false);
    setToday(response.data);
    localStorage.setItem("m0na_documents_today", JSON.stringify(response.data));
  }

  async function getYesterday() {
    setLoading(true);
    const response = await api.get(`/yesterday`);
    setLoading(false);
    setYesterday(response.data);
    localStorage.setItem(
      "m0na_documents_yesterday",
      JSON.stringify(response.data)
    );
  }

  useEffect(() => {
    const storageToday = localStorage.getItem("m0na_documents_today");
    const storageYesterday = localStorage.getItem("m0na_documents_yesterday");

    if (storageToday) {
      setToday(JSON.parse(storageToday));
    } else {
      getToday();
    }

    if (storageYesterday) {
      setYesterday(JSON.parse(storageYesterday));
    } else {
      getYesterday();
    }
  }, []);

  function handleClickRobots() {
    getToday();
    getYesterday();
  }

  return (
    <div style={style.main_content}>
      <button style={style.button} onClick={handleClickRobots}>
        RUN B0TS
      </button>
      <img style={style.m0na_logo} src={logo} alt="m0na-bot logo" />

      {loading ? <p>loading</p> : null}

      <div style={{ display: "flex" }}>
        <ul style={{ width: "500px", margin: 10 }}>
          <h1 className="text">
            {yesterday[0]?.date?.replace(/[ ]*T[ ]*|[ ]+/g, " ")}
          </h1>
          {yesterday && yesterday.map((d) => <Card key={d.grupo} data={d} />)}
        </ul>

        <ul style={{ width: "500px", margin: 10 }}>
          <h1 className="text">
            {today && today[0]?.date?.replace(/[ ]*T[ ]*|[ ]+/g, " ")}
          </h1>
          {today?.map((d) => (
            <Card key={d.grupo} data={d} />
          ))}
        </ul>
      </div>

      <div style={{ margin: 10 }}>
        <hr />
      </div>
    </div>
  );
}
