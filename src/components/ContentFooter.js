import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeactiveFilter, clearCompleted } from "../redux/todos/todosSlice";
export default function ContentFooter() {
  const items = useSelector(state => state.todos.items);
  const itemsLeft = items.filter(item => !item.completed).length;

  const activeFilter = useSelector(state => state.todos.activeFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  const dispatch = useDispatch();

  console.log(itemsLeft);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>
          {itemsLeft < 1
            ? "Great, you've completed all the tasks!"
            : `${itemsLeft} item${itemsLeft > 1 ? "s" : ""} left`}
        </strong>
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeactiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => dispatch(changeactiveFilter("active"))}
            className={activeFilter === "active" ? "selected" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => dispatch(changeactiveFilter("completed"))}
            className={activeFilter === "completed" ? "selected" : ""}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}
