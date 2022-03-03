import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodosAsync,
  toggleTodosAsync,
  deleteTodosAsync,
} from "../redux/todos/todosSlice";
export default function List() {
  const todos = useSelector(state => state.todos.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const isLoading = useSelector(state => state.todos.isLoading);
  const error = useSelector(state => state.todos.error);

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodosAsync({ id, data: { completed } }));
  };

  const handleDelete = async id => {
    if (window.confirm("Have you completed this task?")) {
      await dispatch(deleteTodosAsync(id));
    }
  };
  const activeFilter = useSelector(state => state.todos.activeFilter);

  let filtered = [];

  filtered = todos;

  if (activeFilter !== "all") {
    filtered = todos.filter(todo =>
      activeFilter === "active"
        ? todo.completed === false
        : todo.completed === true
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 style={{ padding: 20 }}>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 style={{ padding: 20, color: "red" }}>Error: {error}!</h2>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {filtered.map(item => (
        <li key={item.id} className={`${item.completed ? "completed" : ""}`}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => handleToggle(item.id, !item.completed)}
              checked={item.completed}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDelete(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}
