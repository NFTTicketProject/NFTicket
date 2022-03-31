import React from "react";
import styled from "styled-components";

import Top from "../components/TicketDetailHandover/Top";
import Middle from "../components/TicketDetailHandover/Middle";
import Bottom from "../components/TicketDetailHandover/Bottom";
import Footer from "../components/Footer";

const TopCss = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const MiddleCss = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const BottomCss = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const TicketDetailHandover = () => {
  return (
    <div>
      <TopCss>
        <Top></Top>
      </TopCss>

      <MiddleCss>
        <Middle></Middle>
      </MiddleCss>

      <BottomCss>
        <Bottom></Bottom>
      </BottomCss>

      <Footer></Footer>
    </div>
  );
};

export default TicketDetailHandover;
