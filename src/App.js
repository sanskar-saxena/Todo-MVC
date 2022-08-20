import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "../src/components/TodoList";
import FilterTodo from "./components/FilterTodo";
import Footer from "./components/Footer";

export const store = createContext();

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [filterMode, setFilterMode] = useState("All");
  const [editMode, seteditMode] = useState(false);

  let [filteredArr, setFilteredArr] = useState([]);
  let [isArrEmpty, setEmptyArr] = useState(false);

  // render list according to the filter Mode
  useEffect(() => {
    if (filterMode === "All") {
      setFilteredArr(listItems);
    } else if (filterMode === "Active") {
      const activeTodoList = listItems?.filter(
        (item) => item.isChecked === false
      );

      setFilteredArr(activeTodoList);
    } else if (filterMode === "Completed") {
      const completedTodoList = listItems?.filter(
        (item) => item.isChecked === true
      );
      setFilteredArr(completedTodoList);
    }
  }, [filterMode, listItems]);

  //setting up the localStorage
  useEffect(() => {
    if (listItems?.length === 0) {
      setEmptyArr(true);
    }
    if (listItems?.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(listItems));
    } else if (isArrEmpty === true) {
      localStorage.setItem("todoList", JSON.stringify([]));
    }
  }, [isArrEmpty, listItems]);

  //getting the todo list from localstorage
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("todoList"));
    if (list?.length > 0) {
      setListItems((prev) => [...prev, ...list]);
    } else {
      setListItems([]);
    }
  }, []);

  return (
    <>
    <store.Provider value={{listItems, setListItems, filterMode, setFilterMode, editMode, seteditMode}}>
      <div className="App">
        <h1 className="primary-heading">todos</h1>
        <div className="container">
          <TodoForm />
          <div className="todoListItems">
            {filteredArr?.map((item) => (
              <TodoList item={item} key={item.id} />
            ))}
          </div>
          {listItems.length > 0 ? <FilterTodo /> : ""}
        </div>
        <Footer />
      </div>
    </store.Provider>
    </>
  );
}
