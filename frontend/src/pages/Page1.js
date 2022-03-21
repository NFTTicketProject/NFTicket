import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMush, setMushMom } from '../store/MushmomReducer'


const Page1 = () => {
  const mushNum = useSelector((state) => state.mush.mushNum);
  const mushType = useSelector((state) => state.mush.mushName);

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Redux 테스트</h1>
      <div>으아니? 다른 router페이지에서도 state 변경이 되네</div>
      <div>머쉬맘 = {mushNum}</div>
      <div>머쉬맘타입 = {mushType}</div>
      <button
        onClick={() => {
          // dispatch({ type: "addMush" });
          dispatch(addMush());
        }}
      >더해보기</button>
      <button
        onClick={() => {
          // dispatch({ type: "setMushMom" });
          dispatch(setMushMom());
        }}
      >Mush Mom되자</button>
    </div>
  );
};

export default Page1;
