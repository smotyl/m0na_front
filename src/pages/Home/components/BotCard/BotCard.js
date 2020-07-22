import React, { useState, useEffect } from "react";

import {
  BotCard as BaseCard,
  Modal,
  Tooltip,
} from "../../../../GlobalComponents";

export default function BotCard({ robot }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!robot.items?.length);
  }, [robot]);

  return (
    <>
      <Tooltip
        disabled={disabled}
        text={`ver ${robot?.items?.length} processos`}
      >
        <BaseCard
          disabled={disabled}
          onClick={() => setModalVisible(!isModalVisible)}
        >
          <h2 className="state-assembly">{robot.aka.toUpperCase()}</h2>
          <h1 className="proccess-today">{robot.dif > 0 ? robot.dif : 0}</h1>
          <span className="proccess-total">total: {robot.total}</span>
        </BaseCard>
      </Tooltip>

      <Modal
        visible={isModalVisible}
        changeVisible={() => setModalVisible(!isModalVisible)}
      >
        <p>
          Últimos resultados
          <small>
            {" "}
            {robot.items?.length || 0} de {robot.total}
          </small>
        </p>
        {robot.items?.map((proccess) => (
          <a className="link" href={`${proccess.url}`}>
            {proccess.description}
          </a>
        ))}
      </Modal>
    </>
  );
}
