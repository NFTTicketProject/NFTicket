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
    flex-wrap: wrap;
    width: 90vw;
    justify-content: center;
  `;


  return (
    <TodayPerformContainer>
      <h1 style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>오늘의 공연</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PerformBox>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
          <Perform/>
        </PerformBox>
      </div>

    
    </TodayPerformContainer>
  );

}

export default TodayPerformance
