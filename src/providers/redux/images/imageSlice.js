import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: {
    imageId: null,
    mimetype: null,
    thumb: null,
    filename: null,
  },
  thumbsNeedRefetch: false,
  modalThumbsNeedRefetch: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setThumbsNeedRefetch: (state, action) => {
      state.thumbsNeedRefetch = action.payload;
    },
    setModalThumbsNeedRefetch: (state, action) => {
      state.modalThumbsNeedRefetch = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setThumbsNeedRefetch, setModalThumbsNeedRefetch, setImage } =
  imageSlice.actions;
export default imageSlice.reducer;
