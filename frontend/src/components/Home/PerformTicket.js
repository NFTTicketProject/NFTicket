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
    transform: scale(1.03);
    box-shadow: 3px 2px 10px 1px #e605ff55;
  }
  border-radius: 15px;
  object-fit: cover;
`;

const PosterImgContainerNotHover = styled.img`
  width: 203px;
  height: 270px;
  &:hover {
  }
  border-radius: 15px;
  object-fit: cover;
`;

const DurationDiv = styled.div`
  font-size: 14px;
  margin-top: 12px;
  color: gray;
`;

const NameDiv = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 12px;
  margin-top: 18px;
  margin-left: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`;

const PriceDiv = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  margin-left: 2px;
  margin-top: 2px;
  font-weight: 700;
`;

const TicketSellerName = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
  margin-bottom: 8px;
`;

const PerformTicket = (props) => {
   const [isBuyable, setIsBuyable] = useState(true)
  const [isSold, setIsSold] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const check = () => {
    // 판매된 티켓은 isBuyable false, isSold true
  if (props.isEnded) {
    setIsBuyable(false)
    setIsSold(true)
  } else {
    // 판매자와 구매자가 같으면 isByuable false 
    if (props.buyable) {
      setIsBuyable(false)
      setIsSeller(true)
    }
  }
  }


{/* {new Date().getTime() > ticketInfo.getEndedAt * 1000 ? (
          <div>판매 종료</div>
        ) : (
          <div>판매 중</div>
        )} */}
  const checkIsSold = () => {
    // 지금 시간이 판매 시간보다 뒤라면
    if(new Date().getTime() > props.endAt * 1000) {
      setIsFinished(true)
    }
  }

  useEffect(() => {
    check()
    checkIsSold()
  }, [])

  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  console.log("🐸", props);

  return (
    <>
    <PerformContainer>
      {/* 판매 종료되었거나, 판매자이면 링크 클릭해도 이동 안되도록 */}
      {/* {(isBuyable&&!isSold&&!ifFinished&&!isSeller)} */}
      {(isBuyable&&!isSold&&!isFinished&&!isSeller) ? (
      <Link to={`/Ticket/${props.id}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
        </Link>
      ) : (
        <PosterImgContainerNotHover
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt="poster img"/>
          )}

      
      {/* <DurationDiv>
        {props.dateStartString} ~ {props.dateEndString} 
      </DurationDiv> */}
      <NameDiv style={{ fontSize: "14px", marginBottom:'0px' }}>{props.name}</NameDiv>
      <NameDiv style={{ fontSize: "12px", marginTop:'0px'}}>{props.description}</NameDiv>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <PriceDiv style={{ fontSize: "14px", fontWeight: "700" }}>{props.price} SSF</PriceDiv>
        {isSold ? ( <div style={{  display:'inline', paddingTop: "0px", paddingBottom: "3px", paddingLeft: "12px", alignItems: 'center', justifyContent: 'center', borderRadius: "50px", backgroundColor: "#bfbfbf"}}><p style={{ display: "inline", fontSize: "12px", color: "white", fontWeight: 600, marginRight: '12px' }}>판매 완료</p></div>) : (<div><div style={{  display:'inline',  paddingTop: "2px", paddingBottom: "3px", paddingLeft: "12px", alignItems: 'center', justifyContent: 'center', borderRadius: "50px", backgroundColor: "#bfbfbf00"}}><p style={{ display: "inline", fontSize: "14px", color: "#ffffff00", fontWeight: 500, marginRight: '12px' }}>판매 완료</p></div></div>)}
      </div>
      <hr style={{ marginTop: "6px", marginBottom: "16px", border: "0.5px solid #c4c4c4" }} />
      {/* 판매 종료되었거나, 판매자이면 판매자 글자 빨강*/}
      {isSeller ? (<TicketSellerName style={{ color: "black", fontWeight: 500 }}>내 티켓</TicketSellerName>) : (<TicketSellerName style={{ fontSize: "14px", color: "grey" }}>{props.ticketSellerName}</TicketSellerName>)}
      {/* <p style={{ fontSize: "14px", color: "gray" }}>판매자 : {props.ticketSellerName}</p> */}
      <TicketSellerName style={{ fontSize: "14px", color: "gray", marginBottom: '12px' }}>{props.stageSellerName}</TicketSellerName>
      {new Date().getTime() > props.endAt * 1000 ? (
          <div>판매 종료</div>
        ) : (
          <div>
            {props.isEnded ? <div>판매 완료</div> : <div>판매 중</div>}
          </div>
        )}
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
