import React from "react";
import styled from "styled-components";

import Notification from "../TicketDetail/Notification";
import NFTInfo from "../TicketDetail/NFTInfo";
import OtherTicketInfo from "./OtherTicketInfo";

const NotificationCss = styled.div`
  margin-top: 20px;
  width: 670px;
`;

const TradeHistoryCss = styled.div``;

const NFTInfoCss = styled.div`
  width: 500px;
`;

const OtherTicketInfoCss = styled.div`
  background-color: #d35400;
`;

const Bottom = () => {
  return (
    <div>
      <NotificationCss>
        <Notification></Notification>
      </NotificationCss>

      <NFTInfoCss>
        <NFTInfo></NFTInfo>
      </NFTInfoCss>

      <OtherTicketInfoCss>
        <OtherTicketInfo></OtherTicketInfo>
      </OtherTicketInfoCss>
    </div>
  );
};

export default Bottom;
