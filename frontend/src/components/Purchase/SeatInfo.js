import React from "react";
import styled from 'styled-components';


const Seat = ()=>{

    return (
      <div>
        
        <h1>SeatInfo 페이지</h1>
        <p>공연 정보</p>
        <p>일자</p>
        <p>시간</p>
        <p>좌석</p>
        <p>좌석 정보</p>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <p>인원</p>
        <p>좌석 잔여석</p>
        <p>선택 완료 버튼</p>
      
      </div>
    );
}

export default Seat