import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  web3,
  ticketSaleAbi,
  myTicketContract,
  IERC20Contract,
  ticketSaleManagerContract,
  showScheduleManagerContract,
} from "../utils/web3Config";

function TicketSale() {
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const { ticketId } = useParams();

  useEffect(() => {
    getTicketInfo();
  }, []);

  // 해당 티켓의 정보를 최대한 받아와보자
  const getTicketInfo = async () => {
    try {
      const showScheduleId = await myTicketContract.methods.getShowScheduleId(ticketId).call();
      const showScheduleAddress = await showScheduleManagerContract.methods
        .getShowSchedule(showScheduleId)
        .call();

      // console.log("티켓주소", showScheduleAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const getSale = async () => {
    try {
      const ticketSaleAddress = await ticketSaleManagerContract.methods.getSale(1).call();
      const approval = await IERC20Contract.methods
        .approve(ticketSaleAddress, 500)
        .send({ from: userData.account });
      // console.log(approval);
      const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, ticketSaleAddress);
      const purchase = ticketSaleContract.methods.purchase().send({ from: userData.account });
      // console.log(purchase);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>TicketSale {ticketId}</h1>
      <button onClick={getSale}>구매</button>
    </div>
  );
}

export default TicketSale;
