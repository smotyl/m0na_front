import React, { useState, useEffect } from "react";

import api from "../../../../services/api";

import "./BotContainer.style.css";
import { BotCard } from "../BotCard";
import { Header } from "./components";
import { BotContainer as BaseContainer } from "../../../../GlobalComponents";

function BotContainer({ children, ...props }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const response = await api.get(`/updated-robots`);
    setLoading(false);
    setData(response.data);
    localStorage.setItem("m0na_files", JSON.stringify(response.data));
  }

  useEffect(() => {
    const storageData = localStorage.getItem("m0na_files");

    if (storageData) {
      setData(JSON.parse(data));
    } else {
      getData();
    }
  }, []);

  function handleClickRefresh() {
    getData();
  }

  if (loading) return "loading";

  return (
    <BaseContainer>
      <Header>
        <p>{data[0]?.date}</p>
        <button onClick={handleClickRefresh}>refresh</button>
      </Header>
      <div className="container-content">
        {data.map((robot, i) => (
          <BotCard robot={robot} />
        ))}
      </div>
    </BaseContainer>
  );
}

export default BotContainer;
