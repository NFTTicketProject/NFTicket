import React from 'react';
import styled from 'styled-components';

import './Home.css'

const Ticket = ()=>{

  const TicketContainer = styled.ul`
    overflow: hidden;
    font-size:0px;
    min-height: 177px;
    white-space: nowrap;
    padding:0px;
  `;

  const TicketImg = styled.img`
    width: 124px;
    margin-right: 8px;
  `;

  return (
    <div class='Tickets' style={{ overflow: 'hidden' }}>
      <TicketContainer>
        <TicketImg src='images/ticketImg1.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg2.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg4.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg3.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg5.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg1.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg2.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg4.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg3.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg5.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg3.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg5.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg1.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg2.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg4.png' alt=''></TicketImg>
        <TicketImg src='images/ticketImg3.png' alt=''></TicketImg>
        <div class='Ticket'>
          <TicketImg src='images/ticketImg5.png' alt=''></TicketImg>
        </div>
      </TicketContainer>

    </div>
      
  );

}

export default Ticket
