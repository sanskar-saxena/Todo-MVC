import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaChevronDown } from "react-icons/fa";
import "./css/todoForm.css";
import { store } from "../App";

const TodoForm = () => {
  const unique_id = uuid().slice(0, 8);
  const [inputValue, setInputValue] = useState("");
  const [isAllChecked, setAllChecked] = useState(true);

  const {
    listItems,
    setListItems,
   } = useContext( store );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      setListItems((prev) => [
        ...prev,
        {
          id: unique_id,
          todo: inputValue,
          isChecked: false,
          isEditable: false,
        },
      ]);
    }
    setInputValue("");
  };

  const handleClick = () => {
    setAllChecked(!isAllChecked);
    let todoUpdatedCheckedState = listItems.map((value) => {
      if (isAllChecked) value.isChecked = true;
      else value.isChecked = false;
      return value;
    });
    setListItems(todoUpdatedCheckedState);
  };

  return (
    <div className="todoform">
      {listItems?.length > 0 ? (
        <button
          className={`checkedAllBtn ${
            isAllChecked
              ? "checkedAllBtn__color-light"
              : "checkedAllBtn__color-dark"
          }`}
          onClick={handleClick}
        >
          <FaChevronDown />
        </button>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="todoform__input"
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoForm;
