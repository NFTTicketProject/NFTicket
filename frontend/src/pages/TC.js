import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract } from "../utils/web3";

function TC() {
  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [ticketDetail, setTicketDetail] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const callShowDetail = async () => {
    try {
      const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      console.log(maxMintCount);
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
        isResellAvailable: resellPolicy[0],
        resellRoyaltyRatePercent: resellPolicy[1],
        resellPriceLimit: resellPolicy[2],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const cancelShow = async () => {
    try {
      const cancel = await showScheduleContract.methods.cancel().send({ from: userData.account });
      console.log(cancel);
    } catch (err) {
      console.error(err);
    }
  };

  const onWithdraw = async () => {
    try {
      const withdraw = await showScheduleContract.methods
        .withdraw()
        .send({ from: userData.account });
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
          <div>{showDetail.resellRoyaltyRatePercent}</div>
          <div>{showDetail.resellPriceLimit}</div>
        </div>
      ) : (
        <div></div>
      )}
      <hr />
      {ticketDetail.map((it, idx) => (
        <div>
          <div>ticketClassName = {it.ticketClassName}</div>
          <div>ticketClassPrice = {it.ticketClassPrice}</div>
          <div>ticketClassMaxMintCount = {it.ticketClassMaxMintCount}</div>
          <hr />
        </div>
      ))}
      <div>
        <button onClick={cancelShow}>cancel Show</button>
      </div>
      <div>
        <button onClick={onWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default TC;
