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

const HomeShow = (props) => {
  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  return (
    <PerformContainer>
      <Link to={`/Detail/${props.show_schedule_address[0]}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.poster_uri}`}
          onError={handleError}
          alt="poster img"
        />
      </Link>
      <p style={{ fontSize: "14px" }}>{props.name}</p>
      <hr />
      <p style={{ fontSize: "14px", color: "gray" }}>카테고리 : {props.category_name}</p>
      <p style={{ fontSize: "14px", color: "gray" }}>캐스팅 : {props.staffs}</p>
    </PerformContainer>
  );
};

export default HomeShow;
