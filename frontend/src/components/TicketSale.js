import React, { useEffect } from "react";
import {
  web3,
  ticketSaleAbi,
  myTicketContract,
  IERC20Contract,
  ticketSaleManagerContract,
} from "../utils/web3Config";

function TicketSale() {
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const getSale = async () => {
    try {
      const ticketSaleAddress = await ticketSaleManagerContract.methods.getSale(1).call();
      const approval = await IERC20Contract.methods
        .approve(ticketSaleAddress, 500)
        .send({ from: userData.account });
      console.log(approval);
      const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, ticketSaleAddress);
      const purchase = ticketSaleContract.methods.purchase().send({ from: userData.account });
      console.log(purchase);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>TicketSale</h1>
      <button onClick={getSale}>구매</button>
    </div>
  );
}

export default TicketSale;
