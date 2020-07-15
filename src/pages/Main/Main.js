import React, { useState, useEffect } from "react";

import Card from "../../components/Card";
import api from "../../services/api";

import logo from "../../assets/logo_400x400.jpg";
import * as style from "./Main.styles";

export function groupBy(array, field) {
  const dadosAgrupados = Object.keys(getKeys(array, field))
    .map((descricaoGrupo) => {
      return array.reduce((result, campo) => {
        if (campo[field] === descricaoGrupo) result.push(campo);
        return result;
      }, []);
    })
    .map((grupoList) => {
      return { grupo: grupoList[0][field], list: grupoList };
    });

  return dadosAgrupados;
}

function getKeys(xs, key) {
  return xs.reduce(function (result, current) {
    (result[current[key]] = result[current[key]] || []).push(current);
    return result;
  }, {});
}

export function Main() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClickRobots() {
    setLoading(true);
    const response = await api.get(`http://67.205.169.66:8080/all_robots`);
    setLoading(false);
    setData(response.data);

    localStorage.setItem("m0na_documents", JSON.stringify(response.data));
    localStorage.setItem("m0na_date", JSON.stringify(new Date()));
  }

  useEffect(() => {
    const storageData = localStorage.getItem("m0na_documents");
    const storageDate = localStorage.getItem("m0na_date");

    if (storageData) {
      setData(JSON.parse(storageData));
      setDate(storageDate);
    }
  }, []);

  return (
    <div style={style.main_content}>
      <p>{date}</p>
      <button onClick={handleClickRobots}>START ROBOTS</button>
      <img style={style.m0na_logo} src={logo} alt="m0na-bot logo" />
      {loading ? <p>loading</p> : null}
      {groupBy(data, "aka").map((d) => (
        <Card key={d.grupo} data={d} />
      ))}
    </div>
  );
}
