import { createSlice } from "@reduxjs/toolkit";

// const connectWallet = async () => {
//   const accounts = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   console.log(window.ethereum);
// };

const accounts = window.ethereum.request({
  method: "eth_requestAccounts",
});
const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    accountInfo: "",
  },
  reducers: {
    changeAccount: (state) => {
      state.accountInfo = accounts[0];
    },
  },
  extraReducers: {},
});

export const { changeAccount } = walletSlice.actions;
export default walletSlice.reducer;
