import React from "react";
import styled from "styled-components";

import "./Seat.css";
import SeatItem from "./SeatItem";

const SeatBox = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;
`;


function SeatLine(props) {
  // function Seat({ grade, num, data, props }) {
  // const Seat = ( grade, num, data, props ) => {

  // console.log('props SeatLine', props);

  const [selectSeatList, setSelectSeats] = React.useState([]);
  // console.log('data', props.data);

  // console.log('data', data);

  // const [seatCheck, setSeat] = React.useState(false);  // 좌석 선택 여부
  // const [count, setCount] = React.useState(0);

  // // 좌석 선택 여부
  // function seatChoice() {
  //   console.log(seatCheck, 'aaaaaa');
  //   setSeat(!seatCheck);
  //   console.log(seatCheck, 'bbbbbb');
  //   seatCheck ? setCount(count + 1) : setCount(count - 1);
  //   console.log(count, 'count');
  // }

  // 좌석 선택 여부
  // const seatChoice2 = async () => {
  //   try {
  //     console.log(seatCheck, 'aaaaaa');
  //     const change = await setSeat(!seatCheck);
  //     console.log(change, 'change');
  //     console.log(seatCheck, 'bbbbbb');
  //     seatCheck ? setCount(count + 1) : setCount(count - 1);
  //     console.log(count, 'count');
  //   }
  //   catch (err) {
  //     console.log("fail", err);
  //   }

  // }

  // // 선택한 좌석 Seat.js로 넘겨주기
  // function seatInfoFunction() {
  //   console.log('정보 전달', seatCheck);
  //   seatCheck ? console.log('선택된 좌석입니다.') : console.log('미선택된 좌석');
  //   // props.setData('hihihi');
  //         // this.props.seatFunction(this.seatCheck);
  // }

  // const testClick = () =>  {  // props 맨 윗줄에서 불러왔으니 더 이상 불러오지 않아도 된다.
  //   // const testClick = (props) =>  {  // props 맨 윗줄에서 불러왔으니 더 이상 불러오지 않아도 된다.
  //   console.log('123445677', props);
  //   if (seatCheck === true) {
  //     props.getData(props.num, props.id);
  //   }
  //   else {
  //     props.deleteData(props.id);
  //   }
  // }

  // 선택된 좌석 정보
  function selectSeats(gradeId, grade, id) {
    // var data = selectSeatList;
    // data = [grade, id];
    var seatId =  id + 1
    var data = [gradeId, grade, id, seatId];
    setSelectSeats((selectSeatList) => data);
    // console.log("넘어온 data list로 묶음", data);
    if (data) {
      // console.log("선택한 좌석", data);
      props.getData(data);
    } else {
      // console.log("선택 취소한 좌석");
    }
  }

  // console.log('seatInfo3', props);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "row", border: "black", width: "800px", height: "60px", flexWrap: 'wrap', justifyContent: 'center', alignItem: 'center' }}>
        {/* <p>{ props.grade } </p> */}
        {props.num.map((seatNum, key) => (
          <div
            className="seat-item"
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
            }}
          >
            {(() => {
              switch (props.grade) {
                case 0:  // VIP
                  return (
                    <div>
                      <SeatItem
                        grade={"VIP"}
                        gradeId={props.grade}
                        num={seatNum}
                        id={key}
                        seatCheck1={props.data}
                        selectSeats={selectSeats}
                      ></SeatItem>
                    </div>
                  );
                case 1:  // R
                  return (
                    <div>
                      <SeatItem
                        grade={"R"}
                        gradeId={props.grade}
                        num={seatNum}
                        id={key}
                        seatCheck1={props.data}
                        selectSeats={selectSeats}
                      ></SeatItem>
                    </div>
                  );
                case 2:  // S
                  return (
                    <div>
                      <SeatItem
                        grade={"S"}
                        gradeId={props.grade}
                        num={seatNum}
                        id={key}
                        seatCheck1={props.data}
                        selectSeats={selectSeats}
                      ></SeatItem>
                    </div>
                  );
                case 3:  // A
                  return (
                    <div>
                      <SeatItem
                        grade={"A"}
                        gradeId={props.grade}
                        num={seatNum}
                        id={key}
                        seatCheck1={props.data}
                        selectSeats={selectSeats}
                      ></SeatItem>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatLine;
