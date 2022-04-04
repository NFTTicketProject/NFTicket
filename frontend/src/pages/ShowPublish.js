import React, { useRef, useEffect, useState } from "react";

import styled from "styled-components";

import TopLeft from "../components/ShowPublish/TopLeft";
import TopRight from "../components/ShowPublish/TopRight";
import Middle from "../components/ShowPublish/Middle";
import Bottom from "../components/ShowPublish/Bottom";
import Footer from "../components/Footer";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

// Top Left
const TopLeftCss = styled.div`
  width: 670px;
  height: 700px;
`;

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

// Top Right
const TopRightCss = styled.div`
  width: 330px;
  height: 700px;
`;

const TopRightFixed = styled.div`
  width: 330px;
  top: 90px;
  position: fixed;
  margin-left: 50px;
`;

const SmallTitleCss = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 16px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 20px;
`;

const DatePickerCss = styled.div`
  display: flex;
  justify-content: center;
`;

const ColorHr = styled.hr`
  border: 1px solid #dadee2;
`;

const ToggleButtonCss = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const SeatCss = styled.div`
  font-size: 14px;
  margin: 16px;
`;

const CastingDivCss = styled.div`
  margin-left: 16px;
  margin-bottom: 20px;
`;

const CastingCss = styled.span`
  margin-left: 7px;
`;

const ButtonBoxCss = styled.div`
  margin-top: 10px;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

// Middle
const MiddleCss = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const BottomCss = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ShowPublish = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = React.useState();
  const doBook = () => {
    alert(startDate + " " + time + " " + "예매하기누름");
  };

  return (
    <div>
      <TopCss>
        <TopLeftCss>
          <TypeAndLeft>
            <Stack direction="row" spacing={1}>
              <Chip label="ㅇㅇ" color="default" />
              <Chip label="토탈" variant="outlined" />
            </Stack>
          </TypeAndLeft>

          <TicketTitle>타이틀입니다</TicketTitle>

          <UnderTitle>
            <PosterArea>
              <Poster src="URL" alt="poster img"></Poster>
            </PosterArea>
            <TicketInfoArea>
              <table>
                <tbody>
                  <tr>
                    <th>장소</th>
                    <td>장소입력</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th>공연기간</th>
                    <td>입력 ~ 입력</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th>공연시간</th>
                    <td>입력 분</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th>관람연령</th>
                    <td>입력 세 이상 관람가</td>
                  </tr>
                </tbody>
                <tbody>
                  {/* <tr>
                <th valign="top">가격</th>
                {props.seatInfo.map((it, idx) => (
                  <tr key={idx}>
                    <th>{it.ticketClassName}</th>
                    <td>{it.ticketClassPrice} SSF</td>
                  </tr>
                ))}
              </tr> */}
                </tbody>
              </table>
            </TicketInfoArea>
          </UnderTitle>
        </TopLeftCss>

        <TopRightCss>
          <CoverBox>
            <SmallTitleCss>관람일</SmallTitleCss>
            <DatePickerCss>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
            </DatePickerCss>

            <ColorHr></ColorHr>

            <SmallTitleCss>좌석</SmallTitleCss>

            <SeatCss>
              {/* {props.seatInfo.map((it, idx) => (
            <span key={idx}>
              <span>{it.ticketClassName} </span>
              <BoldSpan>{it.ticketClassMaxMintCount}석</BoldSpan>
              <span> / </span>
            </span>
          ))} */}
            </SeatCss>

            <ColorHr></ColorHr>

            <SmallTitleCss>캐스팅</SmallTitleCss>
            <CastingDivCss>캐스팅 입력</CastingDivCss>
          </CoverBox>

          <ButtonBoxCss>
            <Stack spacing={1}>
              <Button
                onClick={doBook}
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                  borderColor: "text.secondary",
                  borderRadius: 3,
                  py: 1.5,
                }}
                variant="outlined"
              >
                예매하기
              </Button>
              <Button
                sx={{
                  color: "text.primary",
                  borderColor: "text.secondary",
                  borderRadius: 3,
                  py: 1.5,
                }}
                variant="outlined"
              >
                대기하기
              </Button>
            </Stack>
          </ButtonBoxCss>
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

export default ShowPublish;
