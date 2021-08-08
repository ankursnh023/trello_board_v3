import React, { useEffect, useReducer, useRef, useState } from "react";
import { List } from "./list";
import { reducer } from "./reducer";
import "./styles.css";

export const ListContext = React.createContext();

export default function App() {
  const initialState =
    localStorage.getItem("list_data") != null
      ? JSON.parse(localStorage.getItem("list_data"))
      : [];
  const [state, dispatch] = useReducer(reducer, initialState);

  const [addBtnFlag, setAddBtnFlag] = useState(false);

  const listNameRef = useRef();

  useEffect(() => {
    localStorage.setItem("list_data", JSON.stringify(state));
  }, [state]);

  const handleAddList = () => {
    setAddBtnFlag((flag) => !flag);
  };

  const handleSaveList = (e) => {
    if (listNameRef.current.value.length > 0) {
      dispatch({ type: "add list", payload: listNameRef.current.value });
      listNameRef.current.value = "";
      setAddBtnFlag((flag) => !flag);
    }
  };
  return (
    <ListContext.Provider value={{ listState: state, listDispatch: dispatch }}>
      <div>
        <h1 className="title">Trello Board</h1>
        <hr />
        <div className="btn-add-list">
          {!addBtnFlag ? (
            <button onClick={handleAddList}>Add list</button>
          ) : (
            <div className="add-form-item">
              <input
                ref={listNameRef}
                type="text"
                placeholder="Enter list name"
                required
              />
              <button onClick={handleSaveList}>Save</button>
              <button onClick={handleAddList}>Cancel</button>
            </div>
          )}
        </div>
        <div className="list-items">
          {state?.map((list) => (
            <List key={list.list_name + Math.random() * 100} list={list} />
          ))}
        </div>
      </div>
    </ListContext.Provider>
  );
}
