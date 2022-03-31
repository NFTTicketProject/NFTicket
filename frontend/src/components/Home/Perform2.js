import React from 'react';
import styled from 'styled-components';
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

const Perform2 = ({name, show_id, poster_uri, stageSellerName, stageName, dateStartString, dateEndString, price}) => {

  const handleError = (e) => {
    e.target.src = 'images/posterImg1.png';
  }
  return (
    <PerformContainer>
      <Link to='/'>
        <PosterImgContainer src={poster_uri} onError={handleError} alt='poster img' />
      </Link>
      <p style={{ fontSize: "11px" }}>{dateStartString} ~ {dateEndString}</p>
      <p style={{ fontSize: "14px" }}>{name}</p>
      <p style={{ fontSize: "14px", fontWeight: "700" }}>{price} SSF ~</p>
      <hr/>
      <p style={{ fontSize: "14px", color: "gray" }}>{stageSellerName}</p>
      <p style={{ fontSize: "14px", color: "gray" }}>{stageName}</p>
    </PerformContainer>
  );
}

export default Perform2;
