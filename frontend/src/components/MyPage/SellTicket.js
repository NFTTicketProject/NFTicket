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

function SellTicket({ saleAddr }) {
  const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [ticketInfo, setTicketInfo] = useState({});
  // console.log(saleAddr);

  const getTicketData = async () => {
    try {
      const ticketId = await ticketSaleContract.methods.getTicketId().call();
      const price = await ticketSaleContract.methods.getPrice().call();
      const description = await ticketSaleContract.methods.getDescription().call();
      const getStartedAt = await ticketSaleContract.methods.getStartedAt().call();
      const getEndedAt = await ticketSaleContract.methods.getEndedAt().call();
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
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTicketData();
    checkSale();
  }, []);

  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  const now = new Date().getTime();

  const [toggle, setToggle] = useState(false);
  const checkSale = () => {
    if (ticketInfo.getStartedAt * 1000 < now && ticketInfo.getEndedAt * 1000 > now) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  // console.log(toggle);

  return (
    <PerformContainer>
      <Link to={`/Ticket/${ticketInfo.ticketId}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${ticketInfo.ticketUri}`}
          onError={handleError}
          alt="poster img"
        />
      </Link>
      {/* <p style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString}
      </p> */}
      {/* <p style={{ fontSize: "14px" }}>{props.name}</p> */}
      <p style={{ fontSize: "14px", fontWeight: "700" }}>판매 가격 : {ticketInfo.price} SSF</p>
      <hr />
      <p style={{ fontSize: "14px" }}>공연 설명 : {ticketInfo.description}</p>
      {/* <p style={{ fontSize: "14px" }}>판매 시작 시간 : {ticketInfo.startTime}</p> */}
      {/* <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p> */}
      {/* <p style={{ fontSize: "14px", color: "gray" }}> 판매 종료까지 : {ticketInfo.stageSellerName}</p> */}
    </PerformContainer>
  );
}

export default SellTicket;
