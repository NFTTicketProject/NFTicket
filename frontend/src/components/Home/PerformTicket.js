/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PerformContainer = styled.div`
  width: 203px;
`;

const PosterImgContainer = styled.img`
  width: 203px;
  height: 270px;
  &:hover {
    transform: scale(1.1);
  }
`;

const DurationDiv = styled.div`
  font-size: 11px;
  margin-top: 10px;
  color: gray;
`;

const NameDiv = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const PriceDiv = styled.div`
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
`;

const TicketSellerName = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

const PerformTicket = (props) => {
  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  console.log("id", props);

  return (
    <PerformContainer>
      <Link to={`/Ticket/${props.id}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
      </Link>
      <DurationDiv style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString}
      </DurationDiv>
      <NameDiv style={{ fontSize: "14px" }}>{props.name}</NameDiv>
      <PriceDiv style={{ fontSize: "14px", fontWeight: "700" }}>
        가격 : {props.price} SSF
      </PriceDiv>
      <hr />
      <TicketSellerName style={{ fontSize: "14px", color: "gray" }}>
        판매자 : {props.ticketSellerName}
      </TicketSellerName>
      <TicketSellerName style={{ fontSize: "14px", color: "gray" }}>
        발매자 : {props.stageSellerName}
      </TicketSellerName>
    </PerformContainer>
  );
};

export default PerformTicket;
