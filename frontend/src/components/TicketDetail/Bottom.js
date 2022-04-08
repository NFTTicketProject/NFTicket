import React from "react";
import styled from "styled-components";

import Notification from "./Notification";
import NFTInfo from "./NFTInfo";

const NotificationCss = styled.div`
  margin-top: 20px;
  width: 670px;
`;

const NFTInfoCss = styled.div`
  width: 500px;
`;

const Bottom = () => {
  return (
    <div>
      <NotificationCss>
        <Notification></Notification>
      </NotificationCss>

      {/* <NFTInfoCss>
        <NFTInfo></NFTInfo>
      </NFTInfoCss> */}
    </div>
  );
};

export default Bottom;
