import React from "react";
import styled from "styled-components";

import TopLeft from "../components/TicketDetail/TopLeft";
import TopRight from "../components/TicketDetail/TopRight";
import Middle from "../components/TicketDetail/Middle";
import Bottom from "../components/TicketDetail/Bottom";
import Footer from "../components/Footer";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TopLeftCss = styled.div`
  width: 670px;
  height: 700px;
`;

const TopRightCss = styled.div`
  width: 330px;
  height: 700px;
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

const TicketDetail = () => {
  return (
    <div>
      <TopCss>
        <TopLeftCss>
          <TopLeft></TopLeft>
        </TopLeftCss>

        <TopRightCss>
          <TopRight></TopRight>
        </TopRightCss>
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

export default TicketDetail;
