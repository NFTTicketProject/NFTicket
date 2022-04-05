/* eslint-disable */
import React, { useState } from "react";
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";

const Page4 = () => {
  const [text, SetText] = useState("aa");

  const onChange = (event) => {
    SetText(event.target.value)
  };

  return (
    <div>
      <input
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
      />
    </div>
  )
};

export default Page4;
