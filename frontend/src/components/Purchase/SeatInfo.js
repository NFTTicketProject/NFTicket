import React from "react";
import styled from 'styled-components';

import './Seat.css'


const SeatInfo = (props)=>{

  // console.log('seatInfo props', props)

  return (
    <div>
      
      <h1>SeatInfo 페이지</h1>
      <div style={{ display: 'flex'}}>
        <span>공연 이름 :</span>
        <span>{props.showDetail.stageName}</span>
      </div>
      <div style={{ display: 'flex'}}>
        <span>공연 일자 :</span>
        <span>{props.showDetail.startedAt} ~ {props.showDetail.endedAt}</span>
      </div>

      <div>
        <label>공연 시간</label>
        <select>
          <option value="15">PM 3:00</option>
          <option value="19">PM 7:00</option>
        </select>
      </div>
      <p>좌석 등급 수 : {props.showDetail.ticketClassCount}</p>
      <p>좌석 정보</p>
      <ul className="showcase">
        <li style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="seat-info"></div>
          <small>예매가능</small>
        </li>
        <li style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="seat-info selected"></div>
          <small>선택한 좌석</small>
        </li>
        <li style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="seat-info occupied"></div>
          <small>판매 완료</small>
        </li>
      </ul>
    
    </div>
  );
}

export default SeatInfo