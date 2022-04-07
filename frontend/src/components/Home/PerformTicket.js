/* eslint-disable */
import React, { useEffect, useState } from "react";
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
  const [isBuyable, setIsBuyable] = useState(true)
  const [isSold, setIsSold] = useState(false)

  const check = () => {
  if (props.isEnded) {
    setIsBuyable(false)
    setIsSold(true)
  } else {
    if (!props.buyable) {
      setIsBuyable(false)
    }
  }
  }

  useEffect(() => {
    check()
  }, [])
  


  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  console.log("id", props);

  return (
    <>
<PerformContainer>
      {/* 판매 종료되었거나, 판매자이면 링크 클릭해도 이동 안되도록 */}
      {(isBuyable||isSold) ? (<PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt="poster img"/>) : (
          <Link to={`/Ticket/${props.id}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
      </Link>        
      )}
      
      <p style={{ fontSize: "11px" }}>
        {props.dateStartString} ~ {props.dateEndString} 
      </p>
      <p style={{ fontSize: "14px" }}>{props.name}</p>
      <p style={{ fontSize: "14px", fontWeight: "700" }}>가격 : {props.price} SSF</p>
      <hr />
      {/* 판매 종료되었거나, 판매자이면 판매자 글자 빨강*/}
      {isBuyable ? (<p style={{ fontSize: "14px", color: "red" }}>판매자 : {props.ticketSellerName}</p>) : (<p style={{ fontSize: "14px", color: "grey" }}>판매자 : {props.ticketSellerName}</p>)}
      {/* <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p> */}
      <p style={{ fontSize: "14px", color: "gray" }}>발매자 : {props.stageSellerName}</p>
      {isSold ? ( <p style={{ fontSize: "14px", color: "red" }}>판매 완료</p>) : (<div></div>)}

      {/* <DurationDiv style={{ fontSize: "11px" }}>
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
      </TicketSellerName> */}
    </PerformContainer>
    </>
  );
};

export default PerformTicket;
