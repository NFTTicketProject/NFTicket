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
    justify-content: center;
  `;
  
  return (
    <div>
      <TitleContainer>
        <div style={{display: "flex-column"}}>
        {/* <div style={{ width: "1180px", display: "flex-column", justifyContent: "center"}}> */}
          <Title>티케토</Title>
          <span style={{ width: "1180px" }}>다른 관객들과 NFTicket을 자유롭게 거래해보세요.</span>
        </div>
      </TitleContainer>
      <TicketoItemContainer>
      <TicketoItem/>
      <TicketoItem/>
      <TicketoItem/>
      <TicketoItem/>
      </TicketoItemContainer>
      <TicketoItemContainer>
      <TicketoItem/>
      <TicketoItem/>
      <TicketoItem/>
      <TicketoItem/>
      </TicketoItemContainer>
      
    </div>
  );

}

export default Ticketo
