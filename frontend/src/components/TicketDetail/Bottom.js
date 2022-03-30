import React from "react";
import styled from "styled-components";

import Notification from "./Notification";
import TradeHistory from "./TradeHistory";
import NFTInfo from "./NFTInfo";

const NotificationCss = styled.div`
  margin-top: 20px;
`;

const TradeHistoryCss = styled.div``;

const NFTInfoCss = styled.div`
  width: 500px;
`;

const Bottom = () => {
  return (
    <div>
      <NotificationCss>
        <Notification></Notification>
      </NotificationCss>

      <TradeHistoryCss>
        <TradeHistory></TradeHistory>
      </TradeHistoryCss>

      <NFTInfoCss>
        <NFTInfo></NFTInfo>
      </NFTInfoCss>
    </div>
  );
};

export default Bottom;
