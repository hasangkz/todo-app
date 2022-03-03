import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const responsive = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`
    );
    return responsive.data;
  }
);
export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async data => {
    const responsive = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return responsive.data;
  }
);
export const toggleTodosAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async ({ id, data }) => {
    const responsive = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return responsive.data;
  }
);
export const deleteTodosAsync = createAsyncThunk(
  "todos/deleteTodosAsync",
  async id => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: localStorage.getItem("activeFilter"),
    error: null,
    isLoading: false,
    addNewTodoLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    changeactiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: state => {
      const cleareditems = state.items.filter(item => item.completed === false);
      state.items = cleareditems;
    },
  },

  extraReducers: {
    [getTodosAsync.pending]: state => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },

    [addTodosAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoLoading = false;
    },
    [addTodosAsync.rejected]: (state, action) => {
      state.addNewTodoError = action.error.message;
      state.addNewTodoLoading = false;
    },

    [toggleTodosAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      state.items[index].completed = completed;
    },

    [deleteTodosAsync.fulfilled]: (state, action) => {
      const id = action.payload;

      const filtereditems = state.items.filter(item => item.id !== id);

      state.items = [...filtereditems];
    },
  },
});
export const { changeactiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
