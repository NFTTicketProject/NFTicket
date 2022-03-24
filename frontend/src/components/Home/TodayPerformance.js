import React from 'react';
import Perform from './Perform';
import styled from 'styled-components';


const TodayPerformance = ()=>{

  const TodayPerformContainer = styled.div`
      display: flex-column;
      justify-content: center;
      margin-top: 50px;
    `;

  const PerformBox = styled.div`
    display: flex;
    justify-content: center;

  `;


  return (
    <TodayPerformContainer>
      <h1 style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>오늘의 공연</h1>
      <PerformBox>
        <Perform/>
        <Perform/>
        <Perform/>
        <Perform/>
        <Perform/>
      </PerformBox>
      <PerformBox>
        <Perform/>
        <Perform/>
        <Perform/>
        <Perform/>
        <Perform/>
      </PerformBox>
    
    </TodayPerformContainer>
  );

}

export default TodayPerformance
