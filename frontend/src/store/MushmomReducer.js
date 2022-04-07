import { createSlice } from "@reduxjs/toolkit";

const name = "mush";
const initialState = {
  mushNum: 100,
  mushName: "mushMom",
};

const mushSlice = createSlice({
  name,
  initialState,
  reducers: {
    subMush: (state) => {
      state.mushNum = state.mushNum - 1;
    },
    addMush: (state) => {
      state.mushNum = state.mushNum + 1;
    },
    setMushDad: (state) => {
      state.mushName = "mushDad";
    },
    setMushMom: (state) => {
      state.mushName = "mushMom";
    },
    setMushVal: (state, action) => {
      // 원하는 값으로 바꾸기위한 방법
      state.mushNum = Number(action.payload);
      // console.log(typeof state.mushNum);
    },
  },
  extraReducers: {},
});

export const { subMush, addMush, setMushDad, setMushMom, setMushVal } =
  mushSlice.actions;
export default mushSlice.reducer;
