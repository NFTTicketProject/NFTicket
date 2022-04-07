import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { subMush, setMushDad } from "../store/MushmomReducer";
import { changeAccount } from "../store/WalletReducer";

const Page2 = () => {
  const mushNum = useSelector((state) => state.mush.mushNum);
  const mushType = useSelector((state) => state.mush.mushName);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.wallet.accountInfo);

  return (
    <div>
      <h1>Redux 테스트</h1>
      <div>으아니? 다른 router페이지에서도 state 변경이 되네</div>
      <div>머쉬맘 = {mushNum}</div>
      <div>머쉬맘타입 = {mushType}</div>
      <div>계정 = {account}</div>

      <button
        onClick={() => {
          dispatch(changeAccount());
        }}
      >
        변경
      </button>

      <button
        onClick={() => {
          // dispatch({ type: "subMush" });
          dispatch(subMush());
        }}
      >
        빼보기
      </button>
      <button
        onClick={() => {
          // dispatch({ type: "setMushDad" });
          dispatch(setMushDad());
        }}
      >
        Mush DAD되자
      </button>
    </div>
  );
};

export default Page2;
