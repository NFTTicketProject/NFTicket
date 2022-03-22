import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAccount } from "../store/WalletReducer";

function Wallet() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.wallet.accountInfo);
  return (
    <div>
      <h1>Wallet</h1>
      <div>지갑 주소 = {account}</div>
      <button
        onClick={() => {
          dispatch(changeAccount());
        }}
      >
        계정 연결
      </button>
    </div>
  );
}

export default Wallet;
