import React, {
    useState,
    useEffect,
    useRef,
    useContext,
    useCallback,
  } from "react";
  import { store } from "../App";
  import { FaTimes } from "react-icons/fa";
  import "./css/listItem.css";
  
  const TodoList = ({ item }) => {
    const ref = useRef();
    const [updatedInputValue, setUpdatedInputValue] = useState(item.todo);
    const { listItems, setListItems, seteditMode } = useContext(store);
  
    //function to change the task state "isChecked" whether the task is completed or not
    const handleChange = () => {
      let todoUpdatedState = listItems.map((value) => {
        if (value.id === item.id) {
          if (item.isChecked === false) value.isChecked = true;
          else value.isChecked = false;
        }
        return value;
      });
      setListItems(todoUpdatedState);
    };
  
    //on double click made the todo editable
    const handleDoubleClick = (e) => {
      let updatedEditState = listItems.map((value) => {
        if (value.id !== item.id) {
          value.isEditable = false;
        } else {
          seteditMode(true);
          value.isEditable = true;
          value.todo = updatedInputValue;
        }
        return value;
      });
      setListItems(updatedEditState);
      seteditMode(false);
    };
  
    //save the new value of the editable todo
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        let updatedTodo = listItems.map((value) => {
          if (value.id === item.id) {
            value.todo = updatedInputValue;
            value.isEditable = false;
          }
          return value;
        });
        const removedEmptyTodo = updatedTodo.filter(
          (todo) => todo.todo.length > 0
        );
        setListItems(removedEmptyTodo);
      },
      [item.id, listItems, setListItems, updatedInputValue]
    );
  
    //for checking if user clicked outside other than the targeted value
    useEffect(() => {
      const checkIfClickedOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handleSubmit(e);
          seteditMode(false);
        }
      };
  
      document.addEventListener("click", checkIfClickedOutside);
  
      return () => {
        document.removeEventListener("click", checkIfClickedOutside);
      };
    }, [handleSubmit, seteditMode]);
  
    return (
      <div className="todoItem">
        <input
          type="checkbox"
          name="checkbox"
          className="todoItem__checkbox"
          checked={item.isChecked}
        />
        <label htmlFor="checkbox" onClick={handleChange}></label>
  
        {!item.isEditable ? (
          <p
            id="todoItem__text"
            className={item.isChecked === true ? "todoItem--checked" : ""}
            onDoubleClick={handleDoubleClick}
          >
            {updatedInputValue}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              ref={ref}
              type="text"
              className="editText"
              value={updatedInputValue}
              onChange={(e) => setUpdatedInputValue(e.target.value)}
            />
          </form>
        )}
        { 
          !item.isEditable &&
          <button
            className="deleteTodo"
            onClick={() => {
              let newList = listItems.filter(
                (listEntity) => listEntity.id !== item.id
              );
              setListItems(newList);
            }}
          >
            <FaTimes />
          </button>
        }
      </div>
    );
  };
  
  export default TodoList;
  