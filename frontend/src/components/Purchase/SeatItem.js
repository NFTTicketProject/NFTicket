import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./Seat.css";

function SeatItem(props) {
  // function Seat({ grade, num, data, props }) {
  // const Seat = ( grade, num, data, props ) => {

  // console.log(props, 'props seatItem')

  // var seatCheckTmp = false;

  // const [seatCheck, setSeat] = React.useState(false);  // 좌석 선택 여부
  const [selected, setSelected] = React.useState(false); // 좌석 선택 여부
  const [selectedD, setSelectedD] = React.useState(false);
  // const [count, setCount] = React.useState(0);

  var realNum = props.id + 1  // 실제 좌석 번호 표기 = id + 1

  // var selected1 = '';

  // 좌석 선택 여부

  function seatChoice() {
    var a = props.seatCheck1;
    var selected1 = selected;
    var selectedDesign = selectedD;


    selected1 = !selected1;

    console.log(a, "a 값");
    // if (a !== []) {
    // console.log(a[0], props.grade, 'a 값 비교')
    // console.log(a[1], props.id, 'a 값 비교2')
    // }

    if (a[0] === props.grade && a[1] === props.id) {
      setSelected((selected) => selected1);
      // setSelected(selected => selected1)
      // console.log("같은 값이다#####", selected1);
      if (selected1) {
        // 값이 같은데 true
        // 계속 선택된 색
        selectedDesign = true;
        setSelectedD((selectedD) => selectedDesign);
      } else {
        // 값이 같은데 false
        // 선택 취소된 색
        selectedDesign = false;
        setSelectedD((selectedD) => selectedDesign);
      }
    } else {
      // setSelected(selected => selected1)
      setSelected((selected) => selected1);
      // console.log("다른 자리다$$$$", selected1);
      props.selectSeats(props.gradeId, props.grade, props.id); // 자리값 갱신

      if (selected1) {
        // 값이 다른데 true
        // 선택된 색 + 값 바꾸기
        selectedDesign = true;
        setSelectedD((selectedD) => selectedDesign);
      } else {
        // 값이 다른데 false
        // 선택 취소된 색
        selectedDesign = false;
        setSelectedD((selectedD) => selectedDesign);
      }
    }

    // var seatCheckTmp = seatCheck;
    // // console.log(seatCheckTmp, 'Temp 값')

    // seatCheckTmp = !seatCheckTmp;
    // setSeat(seatCheck => seatCheckTmp)
    // // console.log(seatCheckTmp, 'Temp 값2')

    // if (seatCheckTmp) {   // true : 좌석 선택이 된 상태면
    //   console.log('좌석 선택 됨.....####')
    //   props.selectSeats(props.grade, props.id)
    // }
    // else {  // false : 좌석 선택이 안된 상태면
    //   console.log('좌석 선택 안됨...XXX')
    // }
  }

  // 좌석 선택 여부 - async
  // async function seatChoice2() {
  //   console.log(seatCheck, 'aaaaaa');
  //   // let change = await setSeat(seatCheck => !seatCheck);
  //   console.log(seatCheck, 'bbbbbb');
  //   seatCheck ? setCount(count => count + 1) : setCount(count => count - 1);
  //   console.log(count, 'count');
  // }

  // 선택한 좌석 Seat.js로 넘겨주기
  // function seatInfoFunction() {
  //   console.log('정보 전달', seatCheck);
  //   seatCheck ? console.log('선택된 좌석입니다.') : console.log('미선택된 좌석');
  //   // props.setData('hihihi');
  //         // this.props.seatFunction(this.seatCheck);
  // }

  const testClick = () => {
    // props 맨 윗줄에서 불러왔으니 더 이상 불러오지 않아도 된다.
    // const testClick = (props) =>  {  // props 맨 윗줄에서 불러왔으니 더 이상 불러오지 않아도 된다.
    // console.log('123445677', props);
    // const data = [(props.grade), (props.id)];
    // if (seatCheckTmp === true) {
    //   // props.getData(props.num, props.id);
    //   console.log('선택')
    //   props.selectSeats(data)
    // }
    // else {
    //   // props.deleteData(props.id);
    //   console.log('선택 XXXX')
    // }
  };

  const occupiedSeat = () => {
    alert("이미 판매된 좌석입니다.");
  };


  return (
    <div style={{ width: "50px"}}>
      {props.num ? ( // 이미 예매된 좌석 분류
        <div
          className="seat-item"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "2px",
          }}
        >
          <div
            className="seat occupied"
            onClick={() => {
              occupiedSeat();
            }}
          ></div>
          <div>
            <span style={{ fontSize: "13px" }}>
              {props.grade}-{realNum}
            </span>
          </div>
        </div>
      ) : (
        // {props.seatCheck1[0] === props.grade  && props.seatCheck1[1] === props.id ?

        // }
        <div
          className="seat-item"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "2px",
          }}
        >
          <div
            className={"seat " + (selectedD ? "selected" : "")}
            onClick={() => {
              seatChoice();
              // seatInfoFunction()
              // testClick()
            }}
          ></div>
          <div>
            <span style={{ fontSize: "13px" }}>
              {props.grade}-{realNum}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatItem;
