/* eslint-disable */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMush, setMushMom, setMushVal } from "../store/MushmomReducer";

const Page1 = () => {
  const mushNum = useSelector((state) => state.mush.mushNum);
  const mushType = useSelector((state) => state.mush.mushName);
  const [mushVal, setsMushVal] = useState(0);
  const onChange = (event) => {
    setsMushVal(event.target.value);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Redux 테스트</h1>
      <div>으아니? 다른 router페이지에서도 state 변경이 되네</div>
      <div>머쉬맘 = {mushNum}</div>
      <div>머쉬맘타입 = {mushType}</div>
      <div>mushVal = {mushVal}</div>
      <button
        onClick={() => {
          // dispatch({ type: "addMush" });
          dispatch(addMush());
        }}
      >
        더해보기
      </button>
      <button
        onClick={() => {
          // dispatch({ type: "setMushMom" });
          dispatch(setMushMom());
        }}
      >
        Mush Mom되자
      </button>
      <div>
        <input
          value={mushVal}
          placeholder='mushVal'
          type='number'
          onChange={onChange}
        />
      </div>
      <button
        onClick={() => {
          setsMushVal(mushVal);
          console.log("mushVal", mushVal);
          dispatch(setMushVal(mushVal));
        }}
      >
        mushVal 적용
      </button>
    </div>
  );
};

export default Page1;
