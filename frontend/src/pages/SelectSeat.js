import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";

import Seat from "../components/Purchase/Seat";
import SeatInfo from "../components/Purchase/SeatInfo";


function SelectSeat () {

  // Detail에서 클릭해 받아온 공연 주소
  const { showScheduleAddress } = useParams();  // detail 페이지에서 넘겨 받아온 파라미터 = 공연 정보가 담긴 주소
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);  // showScheduleAddress를 통해서 공연 정보 받아오기

  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  
  // 티켓 발급을 위해 설정해야하는 showScheduleId
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);
  
  // 공연에 해당하는 티켓 정보
  const [ticketDetail, setTicketDetail] = useState([]);

  console.log('🦄', ticketDetail)

  // 티켓 발급을 위해 필요한 정보
  const [myTicket, setMyTicket] = useState({ classId: 0, showScheduleId });  // 좌석 등급, 공연 id
  const [register, setRegister] = useState({});  // 티켓 등록 정보

  const handleTicket = (e) => {
    setMyTicket({ ...myTicket, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  //티켓 등록
  const enrollTicket = async () => {
    try {
      // 1. 티켓 발급
      const createMyTicket = await myTicketContract.methods
        .create(myTicket.ticketURI, parseInt(showScheduleId), parseInt(myTicket.classId))
        .send({ from: userData.account });
      // ticketID 받아오기
      var ticketID = createMyTicket.events.Transfer.returnValues.tokenId;
      setRegister({ ...register, ticketID });
      if (createMyTicket.status) {
        // 2. approve - 토큰 이동
        const approval = await IERC20Contract.methods
          .approve(showScheduleAddress, 500)
          .send({ from: userData.account });
        if (approval.status) {
          alert(`티켓 발급 완료`);
          // 좌석 등록 여부 확인
          const getTicketId = await showScheduleContract.methods
            .getTicketId(parseInt(myTicket.classId), parseInt(register.seatIndex))  // 좌석 등급과 좌석 번호로 좌석 빈 여부 확인
            .call();
          if (getTicketId === 0) {  // 아직 팔리지 않은 좌석이라면
            // 3. register
            const registerTicket = await showScheduleContract.methods
              .registerTicket(
                parseInt(myTicket.classId),
                parseInt(register.seatIndex),
                parseInt(ticketID)
              )
              .send({ from: userData.account });
            if (registerTicket.status) {
              alert(`${ticketID}번 티켓 등록 성공`);
              // // 티켓 발급, 등록 완료되면 /Ticket/:ticketId로 이동
              // navigate(`/Ticket/${ticketID}`);
              // // 티켓 발급, 등록 완료되면 /MyPage로 이동
              // navigate("/MyPage");
            }
          } else {
            alert("이미 예약된 좌석입니다.");
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };



  return (
      <div>
        <h1>티켓 선택 페이지</h1>
        <h2>티켓 발급</h2>
        <div>
          ticketURI:
          <input type="text" name="ticketURI" value={myTicket.ticketURI} onChange={handleTicket} />
        </div>
        <div>
          showScheduleId:
          <input
            type="text"
            name="showScheduleId"
            value={myTicket.showScheduleId}
            onChange={handleTicket}
            disabled={true}
          />
        </div>
        <div>
          classId:
          <input
            type="number"
            name="classId"
            value={myTicket.classId}
            onChange={handleTicket}
            // maxLength={ticketDetail.length}
            min="0"
            max={ticketDetail.length - 1}
          />
        </div>
        {myTicket.classId && <div>금액: {ticketDetail[myTicket.classId].ticketClassPrice} SSF</div>}
        {/* {myTicket.classId === 0 ? (
          <div>금액: {ticketDetail[0].ticketClassPrice} SSF</div>
        ) : (
          <div>금액: {ticketDetail[myTicket.classId].ticketClassPrice} SSF</div>
        )} */}

        <h2>티켓 등록</h2>
        <div>
          seatIndex:
          <input type="text" name="seatIndex" value={register.seatIndex} onChange={handleRegister} />
        </div>

        <div>
          <button onClick={enrollTicket}>Enroll Ticket</button>
        </div>
        <hr />

        <div>
          <h2>좌석 선택</h2>
            <Seat></Seat>
            <SeatInfo></SeatInfo>
        </div>

      </div>
    );
}

export default SelectSeat;