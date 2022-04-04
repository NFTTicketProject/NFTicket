import React from "react";
import styled from "styled-components";
import Ticket from "./Ticket";

const SpecialTicket = () => {
  styled.div`
    display: flex;
    justify-content: center;
  `;

  const Title = styled.h1`
    display: flex;
    justify-content: center;
  `;

  return (
    <div>
      <Title style={{ display: "flex", justifyContent: "center", fontSize: "40px" }}>
        나만의 티켓
      </Title>
      <Ticket></Ticket>
    </div>
  );
};

export default SpecialTicket;
