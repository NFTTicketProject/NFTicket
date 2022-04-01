import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// import DatePicker from "@mui/lab/DatePicker";
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";

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

const TopRight = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = React.useState();

  const handleTime = (event, time) => {
    setTime(time);
  };

  const doBook = () => {
    if (time === undefined) {
      alert("시간을 선택해주세요.");
    } else {
      alert(startDate + " " + time + " " + "예매하기누름");
    }
  };

  const showTimes = ["19:30", "20:30"];

  // seat변수 사용안함
  const seat = [
    {
      VIP: 41,
      R: 206,
      S: 67,
      A: 94,
    },
    {
      VIP: 34,
      R: 103,
      S: 35,
      A: 67,
    },
  ];

  const casting = ["박은태", "선민", "조정은"];

  return (
    <div>
      <CoverBox>
        <SmallTitleCss>관람일</SmallTitleCss>
        <DatePickerCss>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </DatePickerCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>회차</SmallTitleCss>
        <ToggleButtonCss>
          <ToggleButtonGroup value={time} exclusive onChange={handleTime}>
            {showTimes.map((showTime, index) => (
              <ToggleButton key={index} value={showTime}>
                {showTime}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ToggleButtonCss>

        <SeatCss>
          {time === "19:30" ? (
            <div>좌석 수 : 192</div>
          ) : (
            <div>좌석 수 : 239</div>
          )}
        </SeatCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>캐스팅</SmallTitleCss>
        <CastingDivCss>
          {casting.map((name, index) => (
            <CastingCss key={index}>{name}</CastingCss>
            // <div key={index}>{name}</div>;
          ))}
        </CastingDivCss>
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
          <Button
            sx={{
              color: "text.primary",
              borderColor: "text.secondary",
              borderRadius: 3,
              py: 1.5,
            }}
            variant='outlined'
          >
            대기하기
          </Button>
        </Stack>
      </ButtonBoxCss>
    </div>
  );
};

export default TopRight;
