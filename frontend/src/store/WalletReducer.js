import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    accountInfo: "123",
  },
  reducers: {
    changeAccount: (state) => {
      state.accountInfo = "456"
    }
  },
    extraReducers: {},
});


export const { changeAccount } = walletSlice.actions;
export default walletSlice.reducer;
