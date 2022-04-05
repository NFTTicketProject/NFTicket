import React from "react";
import styled from "styled-components";

import "./Seat.css";

const BoldSpan = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const SeatInfo = (props) => {
  // console.log('seatInfo props', props)

  return (
    <div>
      <h2>공연 정보</h2>
      <div style={{ display: "flex", margin: "0 0 5px 0" }}>
        <BoldSpan>공연 이름 : </BoldSpan>
        <span>{props.showDetail.stageName}</span>
      </div>
      <div style={{ display: "flex", margin: "0 0 5px 0" }}>
        <BoldSpan>발매 기간 : </BoldSpan>
        <span>
          {props.showDetail.startedAt} ~ {props.showDetail.endedAt}
        </span>
      </div>
      <div style={{ display: "flex", margin: "0 0 5px 0" }}>
        <BoldSpan>관람 날짜 : </BoldSpan>
        <span>{props.date}</span>
      </div>

      <div style={{margin: "0 0 5px 0"}}>
        <BoldSpan style={{ margin: "0 3px 0 0" }}>관람 시간:</BoldSpan>
        <select>
          <option value='15'>PM 3:00</option>
          <option value='19'>PM 7:00</option>
        </select>
      </div>
      <div style={{ display: "flex", margin: "0 0 5px 0" }}>
        <BoldSpan>좌석 등급 수 : </BoldSpan>
        <span>{props.showDetail.ticketClassCount}</span>
      </div>

      <hr></hr>

      <h2>좌석 정보</h2>
      <ul className='showcase'>
        <li style={{ display: "flex", flexDirection: "column" }}>
          <div className='seat-info'></div>
          <small>예매가능</small>
        </li>
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 5px 0 5px",
          }}
        >
          <div className='seat-info selected'></div>
          <small>선택한 좌석</small>
        </li>
        <li style={{ display: "flex", flexDirection: "column" }}>
          <div className='seat-info occupied'></div>
          <small>판매 완료</small>
        </li>
      </ul>
    </div>
  );
};

export default SeatInfo;
