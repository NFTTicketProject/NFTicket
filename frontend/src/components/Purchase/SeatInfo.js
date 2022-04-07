import React from "react";
import styled from "styled-components";

import "./Seat.css";

const BoldSpan = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
`;


const SeatInfo = (props) => {
  // console.log('seatInfo props', props)

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <p style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>공연 정보</p>
        <div>
          <p
            style={{
              display : 'flex',
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            공연 이름 : 
            <p style={{ 
              fontWeight: "600",
              marginLeft: "4px",
            }}>
              {props.showDetail.stageName}
            </p>
          </p>

          <p
            style={{
              display : 'flex',
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            발매 기간 : 
            <p style={{ 
              fontWeight: "600",
              marginLeft: "4px",
            }}>
              {props.showDetail.startedAt} ~ {props.showDetail.endedAt}
            </p>
          </p>

          <p
            style={{
              display : 'flex',
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            캐스팅 : 
            <p style={{ 
              fontWeight: "600",
              marginLeft: "4px",
            }}>
              {props.showDetailBack.staffs}
            </p>
          </p>
        </div>
        <hr
          style={{
            width: "100%",
            border: "0.5px solid #c8c8c8",
            marginTop: "18px",
            marginBottom: "16px",
          }}
        ></hr>
        <div>
          <p style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', marginTop: "10px" }}>좌석 정보</p>
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
        <hr
          style={{
            width: "100%",
            border: "0.5px solid #c8c8c8",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        ></hr>
      </div>
    </div>
  );
};

export default SeatInfo;
