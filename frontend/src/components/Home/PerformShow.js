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
      <NameDiv style={{ fontSize: "14px" }}>{name}</NameDiv>
      <PriceDiv style={{ fontSize: "14px", fontWeight: "700" }}>
        {price} SSF ~
      </PriceDiv>
      <hr />
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        {stageSellerName}
      </ShowSellerName>
      <pShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        {stageName}
      </pShowSellerName>
    </PerformContainer>
  );
};

export default PerformShow;
