import React from "react";
import styled from "styled-components";

import DetailDescription from "./DetailDescription";
import Notification from "./Notification";
import TradeHistory from "./TradeHistory";
import NFTInfo from "./NFTInfo";

const Middle = () => {
  const DetailDescriptionCss = styled.div``;

  const NotificationCss = styled.div`
    margin-top: 20px;
  `;

  const TradeHistoryCss = styled.div``;

  const NFTInfoCss = styled.div`
    width: 500px;
  `;
  return (
    <div>
      <DetailDescriptionCss>
        <DetailDescription></DetailDescription>
      </DetailDescriptionCss>

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

export default Middle;
