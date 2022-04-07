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
  &:hover {
    transform: scale(1.1);
  }
`;

const NameDiv = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const ShowSellerName = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

const HomeTicket = (props) => {
  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  return (
    <PerformContainer>
      <Link to={`/Ticket/${props.ticketId}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
      </Link>
      <NameDiv style={{ fontSize: "14px" }}>{props.name}</NameDiv>
      <hr />
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        판매자 : {props.ticketSellerName}
      </ShowSellerName>
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        가격 : {props.price} SSF
      </ShowSellerName>
    </PerformContainer>
  );
};

export default HomeTicket;
