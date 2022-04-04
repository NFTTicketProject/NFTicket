import React from "react";
import styled from "styled-components";

import Notification from "./Notification";

const NotificationCss = styled.div`
  margin-top: 20px;
  width: 670px;
`;

const Bottom = () => {
  return (
    <div>
      <NotificationCss>
        <Notification></Notification>
      </NotificationCss>
    </div>
  );
};

export default Bottom;
