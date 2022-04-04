import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Link, useNavigate } from "react-router-dom";

// import DatePicker from "@mui/lab/DatePicker";
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";
import SelectSeat from "../../pages/SelectSeat";

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

// 시간 단위 변경 (unixTime)
const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime);
  const dateString =
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

const TopRight = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  // 예매하기 버튼 클릭 시
  const doBook = () => {
    console.log(startDate);
    const date = unixTimeToDate(startDate);
    console.log("date", date);
    navigate(`/SelectSeat/${props.showScheduleAddress}/${date}`);
    // console.log('props정보', props);
  };

  // console.log(props.posterUri);

  return (
    <div>
      <CoverBox>
        <SmallTitleCss>관람일 선택</SmallTitleCss>
        <DatePickerCss>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </DatePickerCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>잔여 좌석</SmallTitleCss>

        <SeatCss>
          {props.seatInfo.map((it, idx) => (
            <span key={idx}>
              <span>{it.ticketClassName} </span>
              <BoldSpan>{it.ticketClassMaxMintCount}석</BoldSpan>
              <span> / </span>
            </span>
          ))}
        </SeatCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>캐스팅</SmallTitleCss>
        <CastingDivCss>{props.casting}</CastingDivCss>
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
            variant='outlined'
          >
            예매하기
          </Button>
          {/* <Button
            sx={{
              color: "text.primary",
              borderColor: "text.secondary",
              borderRadius: 3,
              py: 1.5,
            }}
            variant="outlined"
          >
            대기하기
          </Button> */}
        </Stack>
      </ButtonBoxCss>
    </div>
  );
};

export default TopRight;
