import { createSlice } from "@reduxjs/toolkit";
import SERVICES from "../../constants/SERVICES";

const initialState = {
  actionItem: "VIEW-ALL",
  idCounter: 0,
  currentTaskID: "",
  tasks: {},
};

export const appSlice = createSlice({
  name: "task-methods",
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks = action.payload ?? {}
      state.idCounter = Object.keys(action.payload ?? {}).length - 1
    },
    addTask: (state, action) => {
      state.actionItem = "ADD-TASK";
      const id = `T_${++state.idCounter}`;
      state.tasks[id] = action.payload;
      (async () => {
        const rawResponse = await fetch(SERVICES.ADD_TASK, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...state.tasks[id] }),
        });
        await rawResponse.json().catch((error) => {
          console.log(error);
          --state.idCounter
        });
      })();
    },
    updateTask: (state, action) => {
      state.actionItem = "UPDATE-TASK";
      state.tasks[action.payload.id] = action.payload.taskData;
      const id = action.payload.id
      state.actionItem = action.payload.taskData.status;

      (async () => {
        const rawResponse = await fetch(SERVICES.UPDATE_TASK, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...state.tasks[id] }),
        });
        await rawResponse.json().catch((error) => {
          console.log(error);
        });
      })();
    },
    deleteTask: (state, action) => {
      state.actionItem = "DELETE-TASK";
      delete state.tasks[action.payload];
      (async () => {
        const rawResponse = await fetch(`${SERVICES.DELETE_TASK}${action.payload}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        await rawResponse.json().catch((error) => {
          console.log(error);
        });
      })();
    },
    addUpdateAction: (state, action) => {
      state.actionItem = action.payload;
    },
    setCurrentTaskId: (state, action) => {
      state.currentTaskID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUpdateAction,
  addTask,
  setAllTasks,
  setCurrentTaskId,
  updateTask,
  deleteTask,
} = appSlice.actions;

export default appSlice.reducer;
