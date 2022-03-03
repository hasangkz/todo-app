import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../redux/todos/todosSlice";
export default function Form() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.todos.addNewTodoLoading);
  const error = useSelector(state => state.todos.addNewTodoError);

  const handleSubmit = async e => {
    if (!title) return;

    e.preventDefault();

    await dispatch(addTodosAsync({ title }));

    setTitle("");
  };

  if (error) {
    return (
      <div>
        <h2 className="new-todo" color="red">
          Error: {error}
        </h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button className="buttonspecial">Add a new task</button>
      {isLoading && <span style={{ marginRight: "0.8rem" }}>Adding...</span>}
    </form>
  );
}
