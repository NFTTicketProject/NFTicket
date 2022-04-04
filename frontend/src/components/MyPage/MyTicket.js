import React, { useState } from "react";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../../utils/web3Config";

function MyTicket({ ticketUri, ticketId, showScheduleId, classId }) {
  const showScheduleAddress = "0x994e4691C536932E9Be251deC70004f2cB4822Fe";
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [seatIndex, setSeatIndex] = useState();

  const onSale = async () => {
    try {
      // register
      const registerTicket = await showScheduleContract.methods
        // .registerTicket(0, 2, 1)
        .registerTicket(parseInt(classId), parseInt(seatIndex), parseInt(ticketId))
        .send({ from: userData.account });
      console.log(registerTicket);
      if (registerTicket.status) {
        alert(`${ticketId}번 티켓 등록 성공`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img src={ticketUri} alt="image" />
      <div>ticketId = {ticketId}</div>
      <div>showScheduleId = {showScheduleId}</div>
      <div>classId = {classId}</div>
      <div>ticketUri = {ticketUri}</div>
      <hr />
    </div>
  );
}

export default MyTicket;
