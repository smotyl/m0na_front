import React, { useState, useEffect } from "react";

import api from "../../../../services/api";

import "./BotContainer.style.css";
import { BotCard } from "../BotCard";
import { Header } from "./components";
import { BotContainer as BaseContainer } from "../../../../GlobalComponents";

function BotContainer({ children, ...props }) {
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

  function handleClickRefresh() {
    getToday();
    getYesterday();
  }

  if (loading) return "loading";

  return (
    <BaseContainer>
      <Header>
        <p>{today[0]?.date}</p>
        <button onClick={handleClickRefresh}>refresh</button>
      </Header>
      <div className="container-content">
        {today.map((robot, i) => (
          <BotCard currentData={robot} previousData={yesterday[i]} />
        ))}
      </div>
    </BaseContainer>
  );
}

export default BotContainer;
