import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import { ListContext } from "./App";
import { Card } from "./card";

export const List = ({ list }) => {
  let context = useContext(ListContext);

  const [addCardFlag, setAddCardFlag] = useState(false);

  const nameRef = useRef();
  const descRef = useRef();

  const handleDelete = (e) => {
    context.listDispatch({
      type: "delete list",
      payload: e.currentTarget.id
    });
  };

  const handleClick = () => {
    setAddCardFlag((flag) => !flag);
  };

  const handleSaveCard = (e) => {
    if (nameRef.current.value.length > 0 && descRef.current.value.length > 0) {
      context.listDispatch({
        type: "add card",
        payload: {
          list_name: list.list_name,
          title: nameRef.current.value,
          desc: descRef.current.value,
          creation_time: moment.now()
        }
      });
      nameRef.current.value = "";
      descRef.current.value = "";
      setAddCardFlag((flag) => !flag);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropListId) => {
    let data = e.dataTransfer.getData("cardData");
    let obj = JSON.parse(data);

    context.listDispatch({
      type: "drag card",
      payload: {
        drop_list_id: dropListId,
        drag_list_id: obj.list_id,
        card: obj.card
      }
    });
  };

  return (
    <>
      <div
        className="list-container"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, list.list_id)}
      >
        <div className="list-header">
          {list.list_name}{" "}
          <span className="fr" id={list.list_name} onClick={handleDelete}>
            x
          </span>
        </div>
        <hr />
        <div className="list-content">
          {list?.cards.map((card) => (
            <Card key={card.creation_time} list_id={list.list_id} card={card} />
          ))}
        </div>
        <div className="add-btn-container">
          {!addCardFlag ? (
            <button className="add-card-btn" onClick={handleClick}>
              +
            </button>
          ) : (
            <div className="card-form-container">
              <input ref={nameRef} type="text" placeholder="Enter Name" />
              <input
                ref={descRef}
                type="text"
                placeholder="Enter Description"
              />
              <div className="card-form-btn">
                <button onClick={handleSaveCard}>Save</button>
                <button onClick={handleClick}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
