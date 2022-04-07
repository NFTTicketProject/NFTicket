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
    <div style={{ disply: 'flex', flexDirection: 'column', justifyContet: 'center', paddingBottom: '90px'}}>
      <p style={{ display: "flex", justifyContent: "center", fontSize: "28px", fontWeight: "600", marginTop: "60px", marginBottom: "50px" }}>
      🎟 나만의 티켓
      </p>
      <Ticket></Ticket>
    </div>
  );
};

export default SpecialTicket;
