import React from "react";
import styled from "styled-components";

import ShareIcon from "@mui/icons-material/Share";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChipAndButton = styled.div`
  display: flex;
`;

const ChipCss = styled.div`
  background-color: #935116;
`;

const ShareButtonCss = styled.div`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  background-color: #9a7d0a;
  cursor: pointer;
`;

const TicketTitleCss = styled.h1`
  background-color: #1d8348;
`;

const SellerCss = styled.div`
  background-color: #27ae60;
  display: flex;
`;

const SellerImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
`;

const SellerName = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
  font-size: 14px;
`;

const SellPriceTableCss = styled.div`
  background-color: #21618c;
`;

const LoginButtonCss = styled.div`
  background-color: #6c3483;
`;

const TopRight = (props) => {
  const what = () => {
    alert("공유");
  };

  return (
    <div>
      <ChipAndButton>
        <ChipCss>
          <Stack direction="row" spacing={1}>
            <Chip label="무슨장르?" color="default" />
            <Chip label="무슨석?" variant="outlined" />
          </Stack>
        </ChipCss>

        <ShareButtonCss>
          <ShareIcon onClick={what}></ShareIcon>
        </ShareButtonCss>
      </ChipAndButton>

      <TicketTitleCss>지킬 앤 하이드</TicketTitleCss>

      <SellerCss>
        <SellerImg src="images/1.png"></SellerImg>
        <SellerName>무야호</SellerName>
      </SellerCss>

      <SellPriceTableCss />
      <LoginButtonCss />
    </div>
  );
};

export default TopRight;
