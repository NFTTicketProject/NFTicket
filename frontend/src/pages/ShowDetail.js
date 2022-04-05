import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TradeTicket from "../components/TradeTicket";
import styled from "styled-components";
import TopLeft from "../components/ShowDetail/TopLeft";
import TopRight from "../components/ShowDetail/TopRight";
import Middle from "../components/TicketDetail/Middle";
import Bottom from "../components/TicketDetail/Bottom";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";
import axios from "axios";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TopLeftCss = styled.div`
  width: 670px;
  height: 700px;
`;

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

// 시간 단위 변경 (unixTime)
const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

function ShowDetail() {
  const [scrollActive, setScrollActive] = useState(true);
  const hallDescription =
    "경기도 남양주시 화도읍사무소 2층에서 진행합니다. 찾아오시는 길: 알아서 버스타고 오세요";
  const [showDetailBack, setShowDetailBack] = useState({});

  ////

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userAccount")); // 유저 정보 (티켓 구매, 발급 등에서 사용)
  // Detail에서 클릭해 받아온 공연 주소
  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  // 주소에 맞는 공연 관련 정보
  const [showDetail, setShowDetail] = useState({});
  // 공연에 해당하는 티켓 정보 - showDetail 안에 있는 데이터를 리스트로 사용하기 위해 새로 만듦.
  const [ticketDetail, setTicketDetail] = useState([]);

  // 티켓 발급을 위해 설정해야하는 showScheduleId
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);

  // 티켓 발급을 위해 필요한 정보
  const [myTicket, setMyTicket] = useState({ classId: 0, showScheduleId }); // 좌석 등급, 공연 id
  const [register, setRegister] = useState({}); // 티켓 등록 정보
  const [occupied, setOccupied] = useState([]); // 좌석 판매 여부

  // 예약된 좌석은 1로 표시
  const [seatInfo, setSeatInfo] = useState([]);

  const handleTicket = (e) => {
    setMyTicket({ ...myTicket, [e.target.name]: e.target.value });
    setOccupied([myTicket.classId, ...occupied]);
  };
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  console.log("showScheduleAddress", showScheduleAddress);

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

  // show 등록 취소 버튼
  const cancelShow = async () => {
    try {
      const cancel = await showScheduleContract.methods.cancel().send({ from: userData.account });
      // console.log(cancel);
      if (cancel.status) {
        window.localStorage.setItem(`${showScheduleAddress}Cancelled`, true);
        navigate("/Detail");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 돈 가져오기
  const onWithdraw = async () => {
    try {
      const withdraw = await showScheduleContract.methods
        .withdraw()
        .send({ from: userData.account });
      console.log(withdraw);
    } catch (err) {
      console.error(err);
    }
  };

  //티켓 등록
  const enrollTicket = async () => {
    try {
      // // 1. 티켓 발급
      // const createMyTicket = await myTicketContract.methods
      //   .create(myTicket.ticketURI, parseInt(showScheduleId), parseInt(myTicket.classId))
      //   .send({ from: userData.account });
      // // ticketID 받아오기
      // var ticketID = createMyTicket.events.Transfer.returnValues.tokenId;
      // setRegister({ ...register, ticketID });
      // if (createMyTicket.status) {
      //   // 2. approve - 토큰 이동
      //   const approval = await IERC20Contract.methods
      //     .approve(showScheduleAddress, 500)
      //     .send({ from: userData.account });
      //   if (approval.status) {
      //     alert(`티켓 발급 완료`);
      //     // 좌석 등록 여부 확인
      //     const getTicketId = await showScheduleContract.methods
      //       .getTicketId(parseInt(myTicket.classId), parseInt(register.seatIndex))  // 좌석 등급과 좌석 번호로 좌석 빈 여부 확인
      //       .call();
      //     if (getTicketId === 0) {  // 아직 팔리지 않은 좌석이라면
      // 좌석 등록 여부 확인 - 0이면 등록 안돼있고, 1 이상이면 등록 되어있는 상태
      const getTicketId = await showScheduleContract.methods
        .getTicketId(parseInt(myTicket.classId), parseInt(register.seatIndex)) // 좌석 등급과 좌석 번호로 좌석 빈 여부 확인
        .call();
      console.log(getTicketId);
      if (getTicketId < 1) {
        // 아직 팔리지 않은 좌석이라면
        // 1. 티켓 발급
        const createMyTicket = await myTicketContract.methods
          .create(myTicket.ticketURI, parseInt(showScheduleId), parseInt(myTicket.classId))
          .send({ from: userData.account });
        // ticketID 받아오기
        var ticketID = createMyTicket.events.Transfer.returnValues.tokenId;
        setRegister({ ...register, ticketID });
        if (createMyTicket.status) {
          // 2. approve
          const approval = await IERC20Contract.methods
            .approve(showScheduleAddress, 500)
            .send({ from: userData.account });
          if (approval.status) {
            alert(`티켓 발급 완료`);
            // // 좌석 등록 여부 확인 - 0이면 등록 안돼있고, 1 이상이면 등록 되어있는 상태
            // const getTicketId = await showScheduleContract.methods
            //   .getTicketId(parseInt(myTicket.classId), parseInt(register.seatIndex))
            //   .call();
            // console.log(getTicketId);
            // 3. register
            const registerTicket = await showScheduleContract.methods
              .registerTicket(
                parseInt(myTicket.classId),
                parseInt(register.seatIndex),
                parseInt(ticketID)
              )
              .send({ from: userData.account });
            if (registerTicket.status) {
              // 초기화
              setMyTicket({ classId: 0, showScheduleId });
              setRegister({});
              alert(`${ticketID}번 티켓 등록 성공`);
              // // 티켓 발급, 등록 완료되면 /Ticket/:ticketId로 이동
              // navigate(`/Ticket/${ticketID}`);
              // // 티켓 발급, 등록 완료되면 /MyPage로 이동
              // navigate("/MyPage");
            }
          }
        }
      } else {
        alert(`이미 예약된 좌석입니다.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callShowDetail();
    test();
  }, []);

  console.log("🎃", seatInfo);
  console.log("🐸", ticketDetail);
  // console.log('seatInfo', seatInfo)
  // console.log("showDetail", showDetailBack.poster_uri);
  // console.log('showDetailBack', showDetailBack)

  return (
    <div>
      <TopCss>
        <TopLeftCss>
          <TopLeft
            showId={`${showDetail.showId}`}
            stageName={`${showDetail.stageName}`}
            startedAt={`${showDetail.startedAt}`}
            endedAt={`${showDetail.endedAt}`}
            allowedAge={`${showDetailBack.age_limit}`}
            showDuration={`${showDetailBack.running_time}`}
            showTitle={`${showDetailBack.name}`}
            catetory={`${showDetailBack.category_name}`}
            posterUri={`${showDetailBack.poster_uri}`}
            ticketDetail={ticketDetail}
            seatInfo={seatInfo}
          ></TopLeft>
        </TopLeftCss>

        <TopRightCss>
          {scrollActive ? (
            <TopRightFixed>
              <TopRight
                ticketDetail={ticketDetail}
                seatInfo={seatInfo}
                casting={`${showDetailBack.staffs}`}
                showScheduleAddress={showScheduleAddress}
              ></TopRight>
            </TopRightFixed>
          ) : (
            <TopRight
              seatInfo={ticketDetail}
              casting={`${showDetailBack.staffs}`}
              showScheduleAddress={showScheduleAddress}
            ></TopRight>
          )}
        </TopRightCss>
      </TopCss>

      <MiddleCss>
        <Middle
          description={`${showDetailBack.description}`}
          casting={`${showDetailBack.staffs}`}
          hallDescription={`${hallDescription}`}
        ></Middle>
      </MiddleCss>

      <BottomCss>
        <Bottom></Bottom>
      </BottomCss>
      {/* <hr />
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
          // min="0"
          // max={ticketDetail.length - 1}
        />
      </div>
      {myTicket.classId && <div>금액: {ticketDetail[myTicket.classId].ticketClassPrice} SSF</div>} */}
      {/* {myTicket.classId === 0 ? (
        <div>금액: {ticketDetail[0].ticketClassPrice} SSF</div>
      ) : (
        <div>금액: {ticketDetail[myTicket.classId].ticketClassPrice} SSF</div>
      )} */}

      {/* <h2>티켓 등록</h2>
      <div>
        seatIndex:
        <input type="text" name="seatIndex" value={register.seatIndex} onChange={handleRegister} />
      </div>

      <div>
        <button onClick={enrollTicket}>Enroll Ticket</button>
      </div>
      <hr /> */}

      {/* 티켓 재판매 */}
      {/* {showDetail.isResellAvailable ? (
        <div>
          <TradeTicket
            showScheduleAddress={showScheduleAddress}
            userData={userData}
            register={register}
          />
        </div>
      ) : (
        <div></div>
      )} */}

      {/* <h1>Show Detail</h1>
      <div>showScheduleAddress = {showScheduleAddress}</div>
      <div>showId = {showDetail.showId}</div>
      <div>stageName = {showDetail.stageName}</div>
      <div>ticketClassCount = {showDetail.ticketClassCount}</div>
      <div>maxMintCount = {showDetail.maxMintCount}</div>
      {showDetail.isResellAvailable ? (
        <div>
          <div>resellRoyaltyRatePercent = {showDetail.resellRoyaltyRatePercent}</div>
          <div>resellPriceLimit = {showDetail.resellPriceLimit}</div>
        </div>
      ) : (
        <div></div>
      )}
      <hr />
      {ticketDetail.map((it, idx) => (
        <div key={idx}>
          <div>ticketClassName = {it.ticketClassName}</div>
          <div>ticketClassPrice = {it.ticketClassPrice}</div>
          <div>ticketClassMaxMintCount = {it.ticketClassMaxMintCount}</div>
          <hr />
        </div>
      ))}
      <div>
        <button onClick={cancelShow}>Cancel Show</button>
      </div>
      <div>
        <button onClick={onWithdraw}>Withdraw</button>
      </div> */}
    </div>
  );
}

export default ShowDetail;
