import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  IERC20Contract,
  ticketSaleAbi,
  myTicketContract,
  ticketSaleManagerContract,
  showScheduleManagerContract,
  showScheduleAbi,
  web3,
} from "../../utils/web3Config";

const PerformContainer = styled.div`
  display: flex-column;
  width: 203px;
  margin: 20px;
`;

const PosterImgContainer = styled.img`
  width: 203px;
  height: 270px;
`;

function Tmp(props) {
  const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, props.saleAddr);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [ticketInfo, setTicketInfo] = useState({});
  const getTicketData = async () => {
    try {
      const seller = await ticketSaleManagerContract.methods.owner().call();
      const ticketId = await ticketSaleContract.methods.getTicketId().call();
      const price = await ticketSaleContract.methods.getPrice().call(); // 리셀가격
      const description = await ticketSaleContract.methods.getDescription().call(); // 상세 정보
      const getStartedAt = await ticketSaleContract.methods.getStartedAt().call(); // 판매 시작시간
      const getEndedAt = await ticketSaleContract.methods.getEndedAt().call(); // 판매 종료시간
      const isEnded = await ticketSaleContract.methods.isEnded().call();
      // const getEndTimeLeft = await ticketSaleContract.methods.getEndTimeLeft().call(); // 판매종료까지 남은시간 - 이거 쓰면 오류남
      const startTime = new Date(getStartedAt * 1000);
      const endTime = new Date(getEndedAt * 1000);

      const ticketUri = await myTicketContract.methods.getTokenURI(ticketId).call();
      setTicketInfo({
        ...ticketInfo,
        ticketId,
        ticketUri,
        price,
        description,
        getStartedAt,
        getEndedAt,
        isEnded,
        // getEndTimeLeft,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTicketData();
  }, []);

  // console.log("🐸", ticketInfo.getStartedAt, new Date().getTime(), ticketInfo.getEndedAt);
  // console.log("🐸", ticketInfo.isEnded);
  // var started = 1649163507000;
  // var ended = 1649163867000;
  // var date = new Date().getTime();
  // var start = new Date(started);
  // var end = new Date(ended);
  // var date = new Date();
  // console.log(start);
  // console.log(date);
  // console.log(end);

  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };
  return (
    <>
      {/* {!ticketInfo.isEnded && ( */}
      <PerformContainer>
        {/* <Link to={`/Ticket/${ticketInfo.ticketId}`}> */}
          <PosterImgContainer
            src={`https://nfticket.plus/showipfs/ipfs/${ticketInfo.ticketUri}`}
            onError={handleError}
            alt="poster img"
          />
        {/* </Link> */}
        {/* <p style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString}
      </p> */}
        {/* <p style={{ fontSize: "14px" }}>{props.name}</p> */}
        <p style={{ fontSize: "14px", fontWeight: "700" }}>판매 가격 : {ticketInfo.price} SSF</p>
        <hr />
        <p style={{ fontSize: "14px" }}>판매자 한마디 : {ticketInfo.description}</p>
        {/* <p style={{ fontSize: "14px" }}>판매 시작 시간 : {ticketInfo.startTime}</p> */}
        {/* <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p> */}
        {/* <p style={{ fontSize: "14px", color: "gray" }}> 판매 종료까지 : {ticketInfo.stageSellerName}</p> */}
        <div style={{ marginTop: "1rem" }}>
          {/* {ticketInfo.isEnded ? <div>판매 완료</div> : <div>판매 중</div>} */}
          {new Date().getTime() > ticketInfo.getEndedAt * 1000 ? (
          <div>판매 종료</div>
        ) : (
          <div>
            {ticketInfo.isEnded ? <div>판매 완료</div> : <div>판매 중</div>}
          </div>
        )}
        </div>
      </PerformContainer>
      {/* )} */}
    </>
  );
}

export default Tmp;
