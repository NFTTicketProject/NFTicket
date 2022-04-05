import React from "react";
import styled from "styled-components";

import Button from "@mui/material/Button";

import "./Seat.css";
import SeatLine from "./SeatLine";
import swal from "sweetalert2";

const SetButtonToLeftDiv = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

const SeatNumberSpan = styled.span`
  margin-top: 10px;
`;

const Seat = (props) => {
  const [grade, setGrade] = React.useState("");
  const [data, setData] = React.useState([]);
  const [info, setInfo] = React.useState();
  const [seatNum, setSeatNum] = React.useState(0);

  // seatInfo 받아오기
  // seatFunction = (info) => {
  //   console.log('info', info)
  // }

  // 공연 정보 넘겨주기
  function setShowInfo(showIndex) {
    localStorage.setItem("selectedShowIndex", showIndex);
  }

  // 좌석 정보 넘겨주기
  function setSeatInfo(seatIndex) {
    localStorage.setItem("selectedSeatIndex", seatIndex);
  }

  // 좌석 수 계산
  // function updateSelectedCount() {
  //   const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //   const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //   const selectedSeatsCount = selectedSeats.length;

  //   count.innerText = selectedSeatsCount;
  //   total.innerText = selectedSeatsCount * ticketPrice;

  //   setMovieData(movieSelect.selectedIndex, movieSelect.value);
  // }

  // 등급 별 좌석 정보
  const seatInfo = props.seatInfo;
  // const seatInfo = [
  //   {
  //     grade: "VIP",
  //     info: [0, 0, 0, 0, 1, 0, 0],
  //   },
  //   {
  //     grade: "R",
  //     info: [0, 0, 0, 1, 0, 0, 0, 0],
  //   },
  //   {
  //     grade: "S",
  //     info: [0, 0, 0, 0, 1, 1, 1, 0, 0],
  //   },
  //   {
  //     grade: "A",
  //     info: [1, 1, 0, 0, 0, 0, 0, 0],
  //   },
  // ];

  // 객체 값 불러오기 -> map으로 해결
  // const keys = Object.keys(seatInfo);
  // // console.log('keys', keys);

  // for (let i = 0; i < keys.length; i++) {
  //   const key = keys[i];
  //   const keys2 = Object.keys(seatInfo[i].info);

  //   for (let j = 0; j < keys2.length; j++) {
  //     const key2 = keys2[j];
  //     // setSeatNum(seatNum => seatInfo[key].info[key2]);
  //     // console.log('seatNum', asdf1);

  //   }
  // }

  // 좌석은 등급 별 인덱스로 나열된다.

  // 이미 선택된 좌석인지 아닌지에 따라 좌석의 선택 가능 여부 UI 표현

  // 좌석을 선택하면, 선택된 좌석의 수 표시

  // 선택한 좌석 정보 표시

  // 좌석의 열과 행을 R1과 같은 모습으로 제시

  // const seatList = seatInfo.map((num, key) => <p key={key}>{num} --- { key }</p>);

  const getData = (index) => {
    // console.log('index', index);
    // console.log('data', data);
    // console.log('id', id);
    setData((data) => index);
    // console.log('dataaaaa추가', data);
  };

  const deleteData = (id) => {
    // console.log('deleteData', id);
    setData(data.filter((data) => data.id !== id));
    // console.log('좌석 선택이 취소되었습니다.')
  };
  // 좌석 정보 보내기
  const seatInfoSend = () => {
    console.log("data", data);
    if (data.length !== 0) {
      props.changeSeatData(data); // 좌석 정보를 상위 컴포넌트인 SelectSeat로 넘겨줌
      // console.log('상위로 좌석 정보 넘겨줌')
    } else {
      swal.fire ({
        icon: 'error',
        title: '좌석을 골라주세요',
      })
    }
  };

  console.log('datadata', data, data[0], data[1])

  return (
    <div>
      <div className="container">
        <div className="screen">STAGE</div>

        {/* <p>{data}</p> */}
        <div className="row">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {seatInfo.map((seat, key) => (
                <SeatLine
                  key={key}
                  grade={seat.grade}
                  num={seat.info}
                  id={key}
                  data={data}
                  getData={getData}
                  deleteData={deleteData}
                  onClick={() => {
                    getData();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "1rem", color: "red" }}>
        * 실제 좌석은 화면에 표시된 위치와 다를 수 있습니다.
      </div>
      <SetButtonToLeftDiv>
        <div style={{ display: 'flex', marginRight: "20px"}}>
          <SeatNumberSpan>좌석 번호 : </SeatNumberSpan>
          <SeatNumberSpan>{ data[1] }</SeatNumberSpan>
          <SeatNumberSpan>-</SeatNumberSpan>
          <SeatNumberSpan>{ data[2] }</SeatNumberSpan>
        </div>
        <Button variant="contained" onClick={seatInfoSend} style={{ backgroundColor: "#707B7C" }}>
          선택하기
        </Button>
      </SetButtonToLeftDiv>
    </div>
  );
};

export default Seat;
