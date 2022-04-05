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

const TopLeft = (props) => {

  // 전체 좌석 수 계산
  const seatGradeNum = props.seatInfo.length;
  let totalSeat = 0;
  for (let i = 0; i < seatGradeNum; i++) {
    totalSeat = totalSeat + Number(props.seatInfo[i].ticketClassMaxMintCount);
  }

  const totalRemainText = "총 " + totalSeat + "장 중 " + totalSeat + "장 남음";

  return (
    <div>
      <TypeAndLeft>
        <Stack direction="row" spacing={1}>
          <Chip label={props.catetory} color="default" />
          <Chip label={totalRemainText} variant="outlined" />
        </Stack>
      </TypeAndLeft>

      <TicketTitle>{props.showTitle}</TicketTitle>

      <UnderTitle>
        <PosterArea>
          <Poster
            src={`https://nfticket.plus/showipfs/ipfs/${props.posterUri}`}
            alt="poster img"
          ></Poster>
        </PosterArea>
        <TicketInfoArea>
          <table>
            <tbody>
              <tr>
                <th>장소</th>
                <td>{props.stageName}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>관람기간</th>
                <td>
                  {props.startedAt} ~ {props.endedAt}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>공연시간</th>
                <td>{props.showDuration}분</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>관람연령</th>
                <td>{props.allowedAge}세 이상 관람가</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th valign="top">가격</th>
                {props.seatInfo.map((it, idx) => (
                  <tr key={idx}>
                    <th>{it.ticketClassName}</th>
                    <td>{it.ticketClassPrice} SSF</td>
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </TicketInfoArea>
      </UnderTitle>
    </div>
  );
};

export default TopLeft;
