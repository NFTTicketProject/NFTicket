import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";

import Seat from "../components/Purchase/Seat";
import SeatInfo from "../components/Purchase/SeatInfo";
import axios from "axios";

// 시간 단위 변경 (unixTime)
const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

function SelectSeat() {
  // Detail에서 클릭해 받아온 공연 주소
  const { showScheduleAddress } = useParams(); // detail 페이지에서 넘겨 받아온 파라미터 = 공연 정보가 담긴 주소
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress); // showScheduleAddress를 통해서 공연 정보 받아오기

  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  // 티켓 발급을 위해 설정해야하는 showScheduleId
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);

  // 주소에 맞는 공연 관련 정보
  const [showDetail, setShowDetail] = useState({});
  // 공연에 해당하는 티켓 정보
  const [ticketDetail, setTicketDetail] = useState([]);

  const [showDetailBack, setShowDetailBack] = useState({});

  // console.log('🦄', ticketDetail)

  // 티켓 발급을 위해 필요한 정보
  const [myTicket, setMyTicket] = useState({ showScheduleId }); // 좌석 등급, 공연 id
  const [register, setRegister] = useState({}); // 티켓 등록 정보
  const [occupied, setOccupied] = useState([]); // 좌석 판매 여부

  // 예약된 좌석은 1로 표시
  const [seatInfo, setSeatInfo] = useState([]);

  // 선택 완료된 좌석 정보
  const [seatData, setSeatData] = useState([]);

  // 좌석 선택 후 data 받아와서 seatData 값 변경해주는 함수
  const changeSeatData = (data) => {
    console.log("selectSeat에서 선택된 좌석 정보", data); // data[0] : gradeId = classId, data[1] : id = seatIndex
    setSeatData((seatData) => data);
    setMyTicket({ ...myTicket, data });
  };

  const handleTicket = (e) => {
    setMyTicket({ ...myTicket, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  // 정보 저장
  // const saveInfo = () => {

  // }

  // contract 통해서 show detail 정보 가져오기
  const callShowDetail = async () => {
    try {
      const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const isCancelled = await showScheduleContract.methods.isCancelled().call();
      // 한길 추가, 공연시작과 끝 가져오기
      let startedAt = await showScheduleContract.methods.getStartedAt().call();
      let endedAt = await showScheduleContract.methods.getEndedAt().call();
      // Unix Timestamp를 Date로 바꾸기
      startedAt = unixTimeToDate(startedAt);
      endedAt = unixTimeToDate(endedAt);
      window.localStorage.setItem("isCancelled", isCancelled);
      // console.log(maxMintCount);
      // 티켓 좌석 정보저장
      const tmp = [];

      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassName = await showScheduleContract.methods.getTicketClassName(i).call();
        const tmpTicketClassPrice = await showScheduleContract.methods
          .getTicketClassPrice(i)
          .call();
        // 가격은 3자리마다 콤마 붙여주었습니다.
        const ticketClassPrice = Number(tmpTicketClassPrice).toLocaleString("ko-KR");
        const ticketClassMaxMintCount = await showScheduleContract.methods
          .getTicketClassMaxMintCount(i)
          .call();
        const occ = [];
        for (let j = 0; j < ticketClassMaxMintCount; j++) {
          const getTicketId = await showScheduleContract.methods.getTicketId(i, j).call();
          if (getTicketId > 0) {
            // console.log("🎃", getTicketId);
            occ.push([i, j]);
            setOccupied(occ);
          }
        }

        tmp.push({
          ticketClassName,
          ticketClassPrice,
          ticketClassMaxMintCount,
        });
      }

      setTicketDetail(tmp);
      setShowDetail({
        ...showDetail,
        showId,
        stageName,
        ticketClassCount,
        maxMintCount,
        isCancelled,
        isResellAvailable: resellPolicy[0],
        resellRoyaltyRatePercent: resellPolicy[1],
        resellPriceLimit: resellPolicy[2],
        startedAt,
        endedAt,
      });
      const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
      // console.log("showInfo", showInfo);
      setShowDetailBack(showInfo.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 좌석 예약 관련, 예약된 좌석 걸러내는 용도
  const test = async () => {
    try {
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const arr = [];
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassMaxMintCount = await showScheduleContract.methods
          .getTicketClassMaxMintCount(i)
          .call();
        const tmp = [];
        for (let j = 0; j < ticketClassMaxMintCount; j++) {
          tmp.push(0);
          const getTicketId = await showScheduleContract.methods.getTicketId(i, j).call();
          if (getTicketId > 0) {
            tmp[j] = 1;
          }
        }
        const newItem = { grade: i, info: tmp };
        arr.push(newItem);
      }
      setSeatInfo(arr);
    } catch (err) {
      console.error(err);
    }
  };

  // 티켓 등록
  const enrollTicket = async () => {
    try {
      // 1. 티켓 발급
      const createMyTicket = await myTicketContract.methods
        .create(showDetailBack.poster_uri, parseInt(showScheduleId), parseInt(myTicket.data[0]))
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
            .getTicketId(parseInt(myTicket.data[0]), parseInt(register.seatIndex)) // 좌석 등급과 좌석 번호로 좌석 빈 여부 확인
            .call();
          if (getTicketId === 0) {
            // 아직 팔리지 않은 좌석이라면
            // 3. register
            const registerTicket = await showScheduleContract.methods
              .registerTicket(
                parseInt(myTicket.data[0]),
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

  useEffect(() => {
    callShowDetail();
    test();
  }, []);

  // console.log('seatInfo', seatInfo);  // 좌석 판매 완료 여부
  // console.log('showDetailBack', showDetailBack);
  // console.log('showDetail', showDetail);
  // console.log('register', register);

  console.log("myTicket", myTicket);

  return (
    <div>
      <h1>티켓 선택 페이지</h1>
      <h2>티켓 발급</h2>
      <div>
        ticketURI:
        <input
          type="text"
          name="ticketURI"
          value={showDetailBack.poster_uri}
          onChange={handleTicket}
          disabled={true}
        />
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
          value={seatData[0]}
          // value={myTicket.classId}
          onChange={handleTicket}
          // maxLength={ticketDetail.length}
          // min="0"
          // max={ticketDetail.length - 1}
          disabled={true}
        />
      </div>
      {myTicket.data && <div>금액: {ticketDetail[myTicket.data[0]].ticketClassPrice} SSF</div>}
      {/* {myTicket.classId === 0 ? (
          <div>금액: {ticketDetail[0].ticketClassPrice} SSF</div>
        ) : (
          <div>금액: {ticketDetail[myTicket.classId].ticketClassPrice} SSF</div>
        )} */}

      <h2>티켓 등록</h2>
      <div>
        seatIndex:
        <input
          type="text"
          name="seatIndex"
          value={seatData[1]}
          // value={register.seatIndex}
          onChange={handleRegister}
          disabled={true}
        />
      </div>

      <div>
        <button onClick={enrollTicket}>Enroll Ticket</button>
      </div>
      <hr />

      <div style={{ margin: "30px" }}>
        <h1>좌석 선택</h1>
        <SeatInfo showDetail={showDetail}></SeatInfo>
        <Seat seatInfo={seatInfo} changeSeatData={changeSeatData}></Seat>
      </div>
    </div>
  );
}

export default SelectSeat;
