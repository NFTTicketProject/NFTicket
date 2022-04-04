import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  web3,
  showScheduleAbi,
  myTicketContract,
  showScheduleManagerContract,
} from "../utils/web3Config";

import axios from "axios";
import styled from "styled-components";

import Top from "../components/TicketDetailHandover/Top";
import Middle from "../components/TicketDetailHandover/Middle";
import Bottom from "../components/TicketDetailHandover/Bottom";
import Footer from "../components/Footer";

const ContainerCss = styled.div`
  width: 1050px;
  margin-left: auto;
  margin-right: auto;
`;

const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

const TicketDetailHandover = () => {
  return (
    <div>
      <ContainerCss>
        <Top></Top>

        <Middle></Middle>

        <Bottom></Bottom>
      </ContainerCss>
      <Footer></Footer>
    </div>
  );
};

export default TicketDetailHandover;
