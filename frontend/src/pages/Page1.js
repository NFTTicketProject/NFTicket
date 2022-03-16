import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Page1 = () => {
  const getFromState = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Redux 테스트</h1>
      <div>으아니? 다른 router페이지에서도 state 변경이 되네</div>
      <div>머쉬맘 = {getFromState}</div>
      <button
        onClick={() => {
          dispatch({ type: "증가" });
        }}
      >
        더해보기
      </button>
    </div>
  );
};

export default Page1;
