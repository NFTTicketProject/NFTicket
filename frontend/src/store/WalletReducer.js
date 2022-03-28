import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    accountInfo: "",
  },
  reducers: {
    changeAccount: (state) => {
      state.accountInfo = "";
    },
    saveAccount: (state, action) => {
      // 원하는 값으로 바꾸기
      state.accountInfo = action.payload;
    },
  },
  extraReducers: {},
});

export const { changeAccount, saveAccount } = walletSlice.actions;
export default walletSlice.reducer;
