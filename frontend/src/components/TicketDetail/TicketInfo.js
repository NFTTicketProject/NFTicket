import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";


const TicketInfoArea = styled.div`
  width: 700px;
  border: 1px solid black;
  display: flex;
`;

const TicketData = styled.div`
  width: 50%;
`;

const TicketInfo = (props) => {

  console.log('props TicketImage', props)

  return (
    <div>
      <TicketInfoArea>
        <TicketData>
          <h1>공연 제목</h1>
          <h2>판매자</h2>
          <p>판매 내용</p>
          <h2>NFTicket 정보</h2>
          <p>소유자</p>
          <p>컨트랙트 주소</p>
          <p>토큰 ID</p>
        </TicketData>
      </TicketInfoArea>
    </div>
  );
};

export default TicketInfo;
