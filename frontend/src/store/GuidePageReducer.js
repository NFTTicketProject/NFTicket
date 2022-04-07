import { createSlice } from "@reduxjs/toolkit";

const guideSlice = createSlice({
  name: "guide",
  initialState: {
    page: 1,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {},
});

export const { changePage } = guideSlice.actions;
export default guideSlice.reducer;
