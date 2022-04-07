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

  console.log("✅", props);

  return (
    <PerformContainer>
      <Link to={`/Detail/${props.show_schedule_address[0]}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.poster_uri}`}
          onError={handleError}
          alt="poster img"
        />
      </Link>
      <p style={{ fontSize: "16px", fontWeight: "600", marginTop: "14px" }}>{props.name}</p>
      {/* <p style={{ fontSize: "16px", fontWeight: "600", marginTop: "8px", marginBottom: "14px" }}>{props.category_name}</p> */}
      <hr />
      <p style={{ fontSize: "16px", fontWeight: "400", color: "gray", marginTop: "14px", marginBottom: "10px" }}>{props.staffs}</p>
      <p style={{ fontSize: "14px", fontWeight: "400", color: "gray" }}>{props.category_name}</p>
    </PerformContainer>
  );
};

export default HomeShow;
