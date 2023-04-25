import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    toggleTask: (state, action) => {
      const { itemId, isChecked } = action.payload;

      if (isChecked) {
        state.push(itemId);
      } else {
        const index = state.indexOf(itemId);
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
