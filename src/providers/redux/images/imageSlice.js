import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {},
  reducers: {
    setImageId: (state, action) => {
      state.imageId = action.payload;
    },
  },
});

export const { setImageId } = imageSlice.actions;
export default imageSlice.reducer;
