import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { web3, ticketSaleManagerContract } from "../../utils/web3Config";
import SellTicket from "./SellTicket";

function TicketOnSale() {
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [saleTicketArray, setSaleTicketArray] = useState([]);
  const [myTicketArray, setMyTicketArray] = useState([]);

  const getMyTicketsOnSale = async () => {
    try {
      const cnt = await ticketSaleManagerContract.methods
        .getSaleIdsByWallet(userData.account)
        .call();
      // console.log("myTicket", cnt.length);
      // console.log("cnt", cnt);
      const tempAddress = [];
      for (let i = 0; i < parseInt(cnt.length); i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSale(parseInt(cnt[i])).call();
        // console.log("🎃", saleAddr);
        tempAddress.push({ saleAddr });
      }
      setMyTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyTicketsOnSale();
  }, []);

  // console.log("🐸", myTicketArray);

  return (
    <div>
      {myTicketArray.map((v, i) => (
        <Grid item xs={3}>
          <SellTicket key={i} {...v} />
        </Grid>
      ))}
    </div>
  );
}

export default TicketOnSale;
