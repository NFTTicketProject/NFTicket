import React from "react";
import styled from "styled-components";

import TopLeft from "../components/TicketDetail/TopLeft";
import TopRight from "../components/TicketDetail/TopRight";
import Middle from "../components/TicketDetail/Middle";
import Footer from "../components/Footer";

const TicketDetail = () => {
  const ContainTopTwo = styled.div`
    display: flex;
    justify-content: center;
  `;

  const TopLeftCss = styled.div`
    width: 670px;
    height: 700px;
    background-color: #123890;
  `;

  const TopRightCss = styled.div`
    width: 330px;
    height: 700px;
    background-color: #123234;
  `;

  const MiddleCss = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <div>
      <ContainTopTwo>
        <TopLeftCss>
          <TopLeft></TopLeft>
        </TopLeftCss>

        <TopRightCss>
          <TopRight></TopRight>
        </TopRightCss>
      </ContainTopTwo>

      <MiddleCss>
        <Middle></Middle>
      </MiddleCss>

      <Footer></Footer>
    </div>
  );
};

export default TicketDetail;
