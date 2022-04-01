import React from "react";
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
