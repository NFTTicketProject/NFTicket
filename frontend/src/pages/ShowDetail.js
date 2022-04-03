import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TradeTicket from "../components/TradeTicket";
// import { web3, showScheduleAbi, myTicketContract } from "../utils/web3";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";

function ShowDetail() {
  const ticket = useRef(1);
  const navigate = useNavigate();
  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [ticketDetail, setTicketDetail] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);
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
      // console.log(maxMintCount);
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
      // console.log(showId);
      // setShowId(getShowId);
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

  //ticketId
  // const myTicketId = myTicketContract.methods.tokenOfOwnerByIndex(1, 2).call();

  //티켓 등록
  const enrollTicket = async () => {
    // console.log(register);
    try {
      const createMyTicket = await myTicketContract.methods
        // .create(
        //   "https://gateway.pinata.cloud/ipfs/QmXMWiTGZRN2LBUWLqVgWimWFzsECXSjNM6TTwwpSnNYF5/1/1.json",
        //   3,
        //   0
        // )
        .create(myTicket.ticketURI, parseInt(showScheduleId), parseInt(myTicket.classId))
        .send({ from: userData.account });
      // console.log(createMyTicket);
      if (createMyTicket.status) {
        // approve
        const approval = await IERC20Contract.methods
          .approve(showScheduleAddress, 500)
          .send({ from: userData.account });
        if (approval.status) {
          alert(`티켓 발급 완료`);
          // register
          const registerTicket = await showScheduleContract.methods
            // .registerTicket(0, 2, 1)
            .registerTicket(
              parseInt(myTicket.classId),
              parseInt(register.seatIndex),
              parseInt(ticket.current)
            )
            .send({ from: userData.account });
          // console.log(registerTicket);
          if (registerTicket.status) {
            alert(`${ticket.current}번 티켓 등록 성공`);
            ticket.current++;
            navigate("/MyPage");
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const onRegister = async () => {
  //   try {
  //     const registerTicket = await showScheduleContract.methods
  //       // .registerTicket(0, 2, 1)
  //       .registerTicket(
  //         parseInt(myTicket.classId),
  //         parseInt(register.seatIndex),
  //         parseInt(register.ticketId)
  //       )
  //       .send({ from: userData.account });
  //     // console.log(registerTicket);
  //     if (registerTicket.status) {
  //       alert(`${register.ticketId}번 티켓 등록 성공`);
  //       navigate("/TicketSale");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    callShowDetail();
  }, []);

  // console.log(register);

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

      {/* <div>{ticketDetail[myTicket.classId].ticketClassPrice}</div> */}

      <hr />
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
          <TradeTicket showScheduleAddress={showScheduleAddress} userData={userData} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShowDetail;
