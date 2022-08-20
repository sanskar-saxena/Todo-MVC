import React, { useEffect, useState , useContext} from "react";
import { store } from "../App";
import "./css/filterTodo.css";

const FilterTodo = () => {
  const {
    listItems,
    setListItems,
    filterMode,
    setFilterMode,
   } = useContext( store );
 const [numberOfTasksToBeDone, setNumberOfTasksToBeDone] = useState(0);

  const handleClick = (filterType) => {
    setFilterMode(filterType);
  };

  const clearCompletedTasks = () => {
    const tasksLeft = listItems.filter((item) => !item.isChecked);
    setListItems(tasksLeft);
  };

  //check or unCheck all the todos
  useEffect(() => {
    const unCheckedTodos = listItems.filter((item) => !item.isChecked);
    setNumberOfTasksToBeDone(unCheckedTodos.length);
  }, [listItems]);

  return (
    <div className="filtertodo">
      <p className="totalItems">{`${numberOfTasksToBeDone}   items  left`}</p>
      <div className="todoBtns ">
        <button
          className={`primaryBtn ${
            filterMode === "All" ? "todoBtn__border" : ""
          }`}
          onClick={() => {
            handleClick("All");
          }}
        >
          All
        </button>
        <button
          className={`primaryBtn ${
            filterMode === "Active" ? "todoBtn__border" : ""
          }`}
          onClick={() => {
            handleClick("Active");
          }}
        >
          Active
        </button>
        <button
          className={`primaryBtn ${
            filterMode === "Completed" ? "todoBtn__border" : ""
          }`}
          onClick={() => {
            handleClick("Completed");
          }}
        >
          Completed
        </button>
      </div>
      <button
        className={`primaryBtn ${
          listItems.length === numberOfTasksToBeDone
            ? "hideClearCompletedBtn"
            : "showClearCompletedBtn"
        }`}
        onClick={clearCompletedTasks}
      >
        Clear completed
      </button>
    </div>
  );
};

export default FilterTodo;
