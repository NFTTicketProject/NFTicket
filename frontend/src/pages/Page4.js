/* eslint-disable */
import { Button } from "@mui/material";
import React, { useState } from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { myTicketContract } from "../utils/web3Config";

const Page4 = () => {
  // const [text, SetText] = useState("aa");
  const [ticketId, setTickeId] = useState(0);
  const onChange = (event) => {
    setTickeId(event.target.value);
  };

  const burn = async () => {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    const burnOldTicket = await myTicketContract.methods
      .burn(parseInt(ticketId))
      .send({ from: userData.account });
    console.log("태운 티켓", ticketId, burnOldTicket);
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="바코드 번호"
        onChange={onChange}
      />
      <Barcode 
        value={text}
        width="1"
        height="100"
        // format="Codabar"
        background= "#FFFF00"
        lineColor="#FF0000"
        // margin="1"
        />
      <QRCode 
        value={text}
        bgColor="#FFFFFF"
        fgColor="#000000"
        size="80"
      /> */}
      <div>
        <input
          value={ticketId}
          placeholder='태울티켓'
          type='number'
          onChange={onChange}
        />
      </div>
      <button onClick={burn}>태우기</button>
    </div>
  );
};

export default Page4;
