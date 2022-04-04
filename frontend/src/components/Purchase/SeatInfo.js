import React from "react";
import styled from 'styled-components';

import './Seat.css'


const SeatInfo = ()=>{

    return (
      <div>
        
        <h1>SeatInfo 페이지</h1>
        <p>공연 정보</p>
        <div>
          <label>Pick a movie:</label>
          <select>
            <option value="10">Avengers: Endgame ($10)</option>
            <option value="12">Joker ($12)</option>
            <option value="8">Toy Story 4 ($8)</option>
            <option value="9">The Lion King ($9)</option>
          </select>
        </div>
        <p>일자</p>

        <p>시간</p>
        <div>
          <label>공연 시간</label>
          <select>
            <option value="15">PM 3:00</option>
            <option value="19">PM 7:00</option>
          </select>
        </div>
        <p>좌석</p>
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