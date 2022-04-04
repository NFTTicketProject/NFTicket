import React, { useEffect, useState } from "react";
import {
  web3,
  showScheduleAbi,
  myTicketContract,
  ticketSaleManagerContract,
  ticketSaleManagerAddress,
} from "../../utils/web3Config";

function TicketOnSale() {
  const [saleStatus, setSaleStatus] = useState(false);
  const [tradeDetail, setTradeDetail] = useState({});
  const [isBuyable, setIsBuyable] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [saleTicketArray, setSaleTicketArray] = useState([]);
  const [myTicketArray, setMyTicketArray] = useState([]);

  const getTicketOnSale = async () => {
    try {
      const cnt = await ticketSaleManagerContract.methods.getCount().call();
      console.log(cnt);
      const tempAddress = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSale(i).call();
        console.log(saleAddr);
        tempAddress.push({ saleAddr });
      }
      setSaleTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const getMyTicketsOnSale = async () => {
    try {
      const cnt = await ticketSaleManagerContract.methods
        .getSaleIdsByWallet(userData.account)
        .call();
      console.log("myTicket", cnt.length);
      console.log("cnt", cnt);
      const tempAddress = [];
      for (let i = 0; i < parseInt(cnt.length); i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSale(parseInt(cnt[i])).call();
        console.log(saleAddr);
        tempAddress.push({ saleAddr });
      }
      setMyTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getTicketOnSale();
    getMyTicketsOnSale();
  }, []);

  return (
    <div>
      {myTicketArray.map((v, i) => (
        <div key={i}>bello</div>
      ))}
      {/* <button disabled={isBuyable}>구매</button> */}
    </div>
  );
}

export default TicketOnSale;
