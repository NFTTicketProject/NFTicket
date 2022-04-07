import React from 'react';
import styled from 'styled-components';

const TicketoItem = ()=>{

  const TicketoContainer = styled.div`
    display: flex-column;
    width: 280px;
    margin: 10px;
  `;

  const TicketoImgContainer = styled.img`
    width: 280px;
    height: 280px;
    background-color: gray;
  `;


  return (
    <TicketoContainer
      onMouseOver={(event) => {
        // console.log("마우스 오버 됨")
      }}
    >
      <TicketoImgContainer 
        src='images/posterImg1.png' 
        alt='poster img' 
        style={{ width: "280px" }}  
      >
        
      </TicketoImgContainer>
      <p style={{ fontSize: "11px" }}>2022.04.01 ~ 2022.06.26</p>
      <p style={{ fontSize: "14px" }}>뮤지컬 데스노트</p>
      <p style={{ fontSize: "14px", fontWeight: "700" }}>70,000 KRW ~</p>
      <hr/>
      <p style={{ fontSize: "14px", color: "gray" }}>충무아트센터 대극장</p>
      <p style={{ fontSize: "14px", color: "gray" }}>오디컴퍼니 주식회사</p>
      
    </TicketoContainer>
  );

}

export default TicketoItem
