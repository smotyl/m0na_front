import React, { useState, useEffect } from "react";

import { BotCard as BaseCard, Modal } from "../../../../GlobalComponents";

export default function BotCard({ currentData, previousData }) {
  const [totalData, setData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const total = currentData.total === "no_value" ? "N/A" : currentData.total;
    const diff =
      (currentData && previousData && currentData.total === "no_value") ||
      currentData.total === "." ||
      previousData.total === "no_value" ||
      previousData.total === "."
        ? "N/A"
        : currentData.total - previousData.total;

    const data = {
      title: currentData.aka.toUpperCase(),
      total: total,
      diff: diff,

      items: currentData.items,
    };

    setData(data);
    setDisabled(!currentData.items.length);
  }, [currentData, previousData]);

  return (
    <>
      <BaseCard
        disabled={disabled}
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <h2 className="state-assembly">{totalData.title}</h2>
        <h1 className="proccess-today">+{totalData.diff}</h1>
        <span className="proccess-total">total: {totalData.total}</span>
      </BaseCard>

      <Modal
        visible={isModalVisible}
        changeVisible={() => setModalVisible(!isModalVisible)}
      >
        <p>5 últimos resultados</p>
        {totalData.items?.map((proccess) => (
          <a className="link" href={`${proccess.url}`}>
            {proccess.description}
          </a>
        ))}
      </Modal>
    </>
  );
}
