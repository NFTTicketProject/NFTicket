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

function MyShow(props) {
  console.log(props);
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, props.getShowSchedule);
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [showInfo, setShowInfo] = useState({});

  const getShowData = async () => {
    try {
      const stageName = await showScheduleContract.methods.getStageName().call(); // 공연 이름
      const showId = await showScheduleContract.methods.getShowId().call();

      const res = await axios.get(`https://nfticket.plus/api/v1/show/${showId}/poster-uri`);
      console.log(res.data.poster_uri);

      setShowInfo({ ...showInfo, stageName, poster: res.data.poster_uri });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShowData();
  }, []);

  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  return (
    <div>
      <PerformContainer>
        <Link to={`/Detail/${props.getShowSchedule}`}>
          <PosterImgContainer
            src={`https://nfticket.plus/showipfs/ipfs/${showInfo.poster}`}
            onError={handleError}
            alt="poster img"
          />
        </Link>
        {/* <p style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString}
      </p> */}
        {/* <p style={{ fontSize: "14px", fontWeight: "700" }}>판매 가격 : {ticketInfo.price} SSF</p> */}
        <hr />
        <p style={{ fontSize: "14px" }}>{showInfo.stageName}</p>
        {/* <p style={{ fontSize: "14px" }}>판매자 한마디 : {ticketInfo.description}</p> */}
        {/* <p style={{ fontSize: "14px" }}>판매 시작 시간 : {ticketInfo.startTime}</p> */}
        {/* <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p> */}
        {/* <p style={{ fontSize: "14px", color: "gray" }}> 판매 종료까지 : {ticketInfo.stageSellerName}</p> */}
        {/* {new Date().getTime() > ticketInfo.getEndedAt * 1000 ? (
          <div>판매 종료</div>
        ) : (
          <div>판매 중</div>
        )} */}
      </PerformContainer>
    </div>
  );
}

export default MyShow;
