import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TradeTicket from "../components/TradeTicket";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";

function ShowDetail() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  // Detail에서 클릭해 받아온 공연 주소
  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  // 주소에 맞는 공연 관련 정보
  const [showDetail, setShowDetail] = useState({});
  // 공연에 해당하는 티켓 정보
  const [ticketDetail, setTicketDetail] = useState([]);
  // 티켓 발급을 위해 설정해야하는 showScheduleId
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);

  // 티켓 발급을 위해 필요한 정보
  const [myTicket, setMyTicket] = useState({ classId: 0, showScheduleId });
  const [register, setRegister] = useState({});

  const handleTicket = (e) => {
    setMyTicket({ ...myTicket, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  // contract 통해서 show detail 정보 가져오기
  const callShowDetail = async () => {
    try {
      const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const isCancelled = await showScheduleContract.methods.isCancelled().call();
      window.localStorage.setItem("isCancelled", isCancelled);
      const tmp = [];
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassName = await showScheduleContract.methods.getTicketClassName(i).call();
        const ticketClassPrice = await showScheduleContract.methods.getTicketClassPrice(i).call();
        const ticketClassMaxMintCount = await showScheduleContract.methods
          .getTicketClassMaxMintCount(i)
          .call();
        tmp.push({ ticketClassName, ticketClassPrice, ticketClassMaxMintCount });
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
      });
    } catch (err) {
      console.error(err);
    }
  };

  // show 등록 취소 버튼
  const cancelShow = async () => {
    try {
      const cancel = await showScheduleContract.methods.cancel().send({ from: userData.account });
      console.log(cancel);
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
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callShowDetail();
  }, []);

  return (
    <div>
      <h1>Show Detail</h1>
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
      </div>
      <hr />
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

      <h2>티켓 등록</h2>
      <div>
        seatIndex:
        <input type="text" name="seatIndex" value={register.seatIndex} onChange={handleRegister} />
      </div>

      <div>
        <button onClick={enrollTicket}>Enroll Ticket</button>
      </div>
      <hr />

      {showDetail.isResellAvailable ? (
        <div>
          <TradeTicket
            showScheduleAddress={showScheduleAddress}
            userData={userData}
            register={register}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShowDetail;
