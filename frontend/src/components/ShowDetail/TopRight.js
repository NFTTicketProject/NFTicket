import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// import DatePicker from "@mui/lab/DatePicker";
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";
import SelectSeat from "../../pages/SelectSeat";

const SmallTitleCss = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-top: 16px;
  margin-left: 18px;
  margin-bottom: 18px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 15px;
`;

const DatePickerCss = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 18px;
`;

const ColorHr = styled.hr`
  border: 0.5px solid #dadee2;
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
  // 전체 좌석 수 계산
  const seatGradeNum = props.seatInfo.length;
  const tmp = [];
  let totalSeat = 0;
  // let leftSeat = 0;

  for (let i = 0; i < seatGradeNum; i++) {
    totalSeat = totalSeat + Number(props.seatInfo[i].info.length);
    let leftSeat = Number(props.seatInfo[i].info.length);
    tmp.push(leftSeat);
    for (let j = 0; j < totalSeat; j++) {
      if (props.seatInfo[i].info[j] === 1) {
        tmp[i] = tmp[i] - 1;
        // leftSeat = leftSeat - 1;
      }
    }
  }

  // const [startDate, setStartDate] = useState(new Date());
  // console.log("🐸", tmp);
  const startDate = new Date(props.startedAt);
  const endDate = new Date(props.endedAt);

  const navigate = useNavigate();


    ////
const checkAccount = async () => {
    try {
      if (!localStorage.getItem("userAccount")){
        swal.fire({
            title : "지갑을 연결해주세요.",
                icon  : "warning",
                closeOnClickOutside : false
          }).then(function(){
            // 이벤트
            navigate('/MyPage')
            // alert('hello')
          });
        // alert('hello')
      }
    } catch(err){
      console.error(err)
    }
  }

  // 예매하기 버튼 클릭 시

  const doBook = () => {
    checkAccount()
    navigate(`/SelectSeat/${props.showScheduleAddress}`);
    // console.log('props정보', props);
  };

  // console.log(props.posterUri);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

 console.log('ticketDetail', props.ticketDetail);

  return (
    <div style={{ marginTop: "44px", marginLeft: "px" }}>
      <CoverBox>
        <SmallTitleCss style={{ marginTop: "20px" }}>판매 기간</SmallTitleCss>
        {isNaN(startDate) ? (
          <div style={{ marginLeft: "30px" }}>로딩중..</div>
        ) : (
          <DatePickerCss>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              minDate={new Date().addDays(20000)}
              selectsRange
              inline
            />
          </DatePickerCss>
        )}

        <ColorHr></ColorHr>

        <SmallTitleCss>잔여 좌석</SmallTitleCss>

        <SeatCss>
          {props.ticketDetail.map((it, idx) => (
            <p key={idx} style={{ marginBottom: "8px"}}>
              <span style={{fontSize: "15px", fontWeight: "400", marginBotom: "10px", marginLeft: "4px"}}>{it.ticketClassName}  : </span>
              {/* <BoldSpan>{it.ticketClassMaxMintCount}석</BoldSpan> */}
              <BoldSpan>{tmp[idx]}석</BoldSpan>
            </p>
          ))}
        </SeatCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>캐스팅</SmallTitleCss>
        <CastingDivCss>
          <p style={{fontSize: "15px", fontWeight: "400", marginBotom: "10px", marginLeft: "4px"}}>{props.casting}</p>
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
              mt: 0.5,
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
