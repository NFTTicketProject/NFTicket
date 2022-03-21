import { createSlice } from '@reduxjs/toolkit';

const mushSlice = createSlice({
  name: 'mush',
  initialState: {
    mushNum: 100,
    mushName: "mushMom"
  },
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
  },
  extraReducers: {},
});

export const { subMush, addMush, setMushDad, setMushMom } = mushSlice.actions;
export default mushSlice.reducer;