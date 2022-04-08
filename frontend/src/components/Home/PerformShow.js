/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PerformContainer = styled.div`
  width: 260px;
`;

const PosterImgContainer = styled.img`
  width: 260px;
  height: 260px;
  &:hover {
    transform: scale(1.03);
  }
  // boder-radius: "15px";
  object-fit: cover;
`;

const DurationDiv = styled.div`
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 10px;
  color: gray;
`;

const NameDiv = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`;

const PriceDiv = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  margin-top: 8px;
  font-weight: 700;
`;

const ShowSellerName = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

const PerformShow = ({
  name,
  show_id,
  poster_uri,
  stageSellerName,
  stageName,
  dateStartString,
  dateEndString,
  price,
  address,
}) => {
  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };
  // console.log(poster_uri)
  return (
    <PerformContainer>
      <Link to={`/Detail/${address}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${poster_uri}`}
          onError={handleError}
          alt='poster img'
        />
      </Link>
      <DurationDiv>
        {dateStartString} ~ {dateEndString}
      </DurationDiv>
      <NameDiv>{name}</NameDiv>
      <PriceDiv>
        {price} SSF ~
      </PriceDiv>
      <hr style={{ marginTop: "18px", marginBottom: "16px", border: "0.5px solid #c4c4c4" }} />
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        {stageSellerName}
      </ShowSellerName>
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        {stageName}
      </ShowSellerName>
    </PerformContainer>
  );
};

export default PerformShow;
