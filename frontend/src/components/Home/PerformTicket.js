/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PerformContainer = styled.div`
  display: flex-column;
  width: 203px;
  margin: 20px;
`;

const PosterImgContainer = styled.img`
  width: 203px;
  height: 270px;
  background-color: gray;
`;

const PerformTicket = (props) => {
  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  console.log('id', props)

  return (
    <PerformContainer>
      <Link to={`/Ticket/${props.id}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt="poster img"
        />
      </Link>
      <p style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString}
      </p>
      <p style={{ fontSize: "14px" }}>{props.name}</p>
      <p style={{ fontSize: "14px", fontWeight: "700" }}>가격 : {props.price} SSF</p>
      <hr />
      <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p>
      <p style={{ fontSize: "14px", color: "gray" }}>발매자 : {props.stageSellerName}</p>
    </PerformContainer>
  );
};

export default PerformTicket;
