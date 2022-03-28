import React from 'react';
import styled from 'styled-components';

import TicketoItem from './TicketoItem';

const Ticketo = ()=>{

  styled.div`
    display: flex-column;
  `;

  const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 10px;
  `;

  const Title = styled.h2`
    display: flex;
    margin-bottom: 4px;
    width: 1180px;
  `;

  const TicketoItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    justify-content: center;
  `;
  
  return (
    <div>
      <TitleContainer>
        <div style={{ display: "flex-column", width: "90vw" }}>
        {/* <div style={{ width: "1180px", display: "flex-column", justifyContent: "center"}}> */}
          <Title>티케토</Title>
          <span style={{ width: "80vw" }}>다른 관객들과 NFTicket을 자유롭게 거래해보세요.</span>
        </div>
      </TitleContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TicketoItemContainer>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
          <TicketoItem/>
        </TicketoItemContainer>
      </div>
      
    </div>
  );

}

export default Ticketo
