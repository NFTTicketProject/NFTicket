import React from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import {useNavigate } from "react-router-dom";

styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const SpecialTicket = () => {
  const navigate = useNavigate()
  return (
    <div style={{ disply: 'flex', flexDirection: 'column', justifyContet: 'center', paddingBottom: '90px'}}>
      <p style={{ display: "flex", justifyContent: "center", fontSize: "28px", fontWeight: "600", marginTop: "60px", marginBottom: "50px", cursor:'pointer' }} onClick={()=>{navigate("/MyPage")}}>
      🎫 나만의 티켓
      </p>
      <Ticket></Ticket>
    </div>
  );
};

export default SpecialTicket;
