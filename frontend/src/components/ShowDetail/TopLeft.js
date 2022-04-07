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
  margin-top: 10px;
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
  let leftSeat = 0;

  for (let i = 0; i < seatGradeNum; i++) {
    totalSeat = totalSeat + Number(props.seatInfo[i].info.length);
    for (let j = 0; j < totalSeat; j++) {
      if (props.seatInfo[i].info[j] === 1) {
        leftSeat = leftSeat - 1;
      }
    }
  }
  // for (let i = 0; i < seatGradeNum; i++) {
  //   totalSeat = totalSeat + Number(props.seatInfo[i].ticketClassMaxMintCount);
  // }

  const totalRemainText = "총 " + totalSeat + "장 중 " + (totalSeat + leftSeat) + "장 남음";

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
          <table style={{ display: 'flex', flexDirection: "row", marginLeft: "18px", marginTop: "22px" }}>
            <div style={{ display: 'flex', flexDirection: "column", alignItems: "start", marginRight: "14px" }}>
                <th>장소</th>
                <th>판매기간</th>
                <th>공연시간</th>
                <th>관람연령</th>
                <th valign="top">가격</th>
            </div>
            <div style={{ display: 'flex', flexDirection: "column" }} >
              <td>{props.stageName}</td>
              <td>{props.startedAt} ~ {props.endedAt}</td>
              <td>{props.showDuration}분</td>
              <td>{props.allowedAge}세 이상 관람가</td>
              <div>
                {props.ticketDetail.map((it, idx) => (
                  <tr key={idx} style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: 'flex', width: "90px" }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <td style={{ fontWeight: "500" }}>{it.ticketClassName} 좌석</td>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <td>{it.ticketClassPrice} SSF</td>
                    </div>

                  </tr>
                ))}
              </div>
            </div>
          </table>
        </TicketInfoArea>
      </UnderTitle>
    </div>
  );
};

export default TopLeft;
