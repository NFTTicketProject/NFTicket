import React from 'react';
import styled from 'styled-components';

const Perform = ()=>{

  const PerformContainer = styled.div`
    display: flex-column;
    width: 203px;
    margin: 20px;
  `;

  const PosterImgContainer = styled.img`
    width: 203px;
    height: 270px;
    background-color: gray;
  `;


  return (
    <PerformContainer>
      <PosterImgContainer src='images/posterImg1.png' alt='poster img'>
        {/* <img src='images/posterImg1.png' alt='poster img' ></img> */}
      </PosterImgContainer>
      <p style={{ fontSize: "11px" }}>2022.04.01 ~ 2022.06.26</p>
      <p style={{ fontSize: "14px" }}>뮤지컬 데스노트</p>
      <p style={{ fontSize: "14px", fontWeight: "700" }}>70,000 KRW ~</p>
      <hr/>
      <p style={{ fontSize: "14px", color: "gray" }}>충무아트센터 대극장</p>
      <p style={{ fontSize: "14px", color: "gray" }}>오디컴퍼니 주식회사</p>
      
    </PerformContainer>
  );

}

export default Perform
