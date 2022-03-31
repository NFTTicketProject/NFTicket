import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract } from "../utils/web3";

function ShowDetail() {
  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [ticketDetail, setTicketDetail] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userAccount"));

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
    </div>
  );
}

export default ShowDetail;
