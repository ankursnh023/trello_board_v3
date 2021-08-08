import React, { useContext } from "react";
import { ListContext } from "./App";

export const Card = ({ card, list_id }) => {
  let context = useContext(ListContext);

  const deleteCard = () => {
    context.listDispatch({
      type: "delete card",
      payload: {
        list_id: list_id,
        card: card
      }
    });
  };

  const handleDragStart = (e, cardData) => {
    let str = JSON.stringify({
      list_id: list_id,
      card: cardData
    });
    e.dataTransfer.setData("cardData", str);
  };

  return (
    <div
      className="card-container"
      draggable
      onDragStart={(e) => handleDragStart(e, card)}
    >
      <div className="card-header">
        {card.title}{" "}
        <span className="fr" onClick={deleteCard}>
          x
        </span>
      </div>
      <div className="card-content">{card.desc}</div>
    </div>
  );
};
