import React from "react";
import styled from "styled-components";
import "./TopLeft.css";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const TypeAndLeft = styled.div`
  margin-left: 20px;
`;

const TicketTitle = styled.h1`
  margin-left: 20px;
`;

const UnderTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const PosterArea = styled.div`
  width: 500px;
  margin-left: 20px;
`;

const Poster = styled.img`
  width: 100%;
`;

const TicketInfoArea = styled.div`
  width: 500px;
  margin-left: 20px;
`;

const TopLeft = () => {
  const ticketType = "뮤지컬";
  const totalAmount = 110;
  const remainAmount = 32;
  const totalRemainText =
    "총 " + totalAmount + "장 중 " + remainAmount + "장 남음";
  const ticketTitle = "뮤지컬 지킬앤하이드 (Jekyll & Hyde)";
  const posterDirectory =
    "http://ticketimage.interpark.com/Play/image/large/22/22001534_p.gif";

  const showPlace = "샤롯데씨어터";
  const showStart = "2021.10.19";
  const showEnd = "2022.05.08";
  const showDuration = 170;
  const allowedAge = 14;
  const price = {
    VIP: 150000,
    R: 130000,
    S: 100000,
    A: 70000,
  };

  return (
    <div>
      <TypeAndLeft>
        <Stack direction='row' spacing={1}>
          <Chip label={ticketType} color='default' />
          <Chip label={totalRemainText} variant='outlined' />
        </Stack>
      </TypeAndLeft>

      <TicketTitle>{ticketTitle}</TicketTitle>

      <UnderTitle>
        <PosterArea>
          <Poster src={`${posterDirectory}`} alt='poster img'></Poster>
        </PosterArea>
        <TicketInfoArea>
          <table>
            <tr>
              <th>장소</th>
              <td>{showPlace}</td>
            </tr>
            <tr>
              <th>공연기간</th>
              <td>
                {showStart} ~ {showEnd}
              </td>
            </tr>
            <tr>
              <th>공연시간</th>
              <td>{showDuration}분</td>
            </tr>
            <tr>
              <th>관람연령</th>
              <td>{allowedAge}세 이상 관람가</td>
            </tr>
            <tr>
              <th valign='top'>가격</th>
              <tr>
                <th>VIP석</th>
                <td>{price.VIP}</td>
              </tr>
              <tr>
                <th>R석</th>
                <td>{price.R}</td>
              </tr>
              <tr>
                <th>S석</th>
                <td>{price.S}</td>
              </tr>
              <tr>
                <th>A석</th>
                <td>{price.A}</td>
              </tr>
            </tr>
          </table>
        </TicketInfoArea>
      </UnderTitle>
    </div>
  );
};

export default TopLeft;
