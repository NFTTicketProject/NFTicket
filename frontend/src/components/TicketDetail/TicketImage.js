import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";


const PosterArea = styled.div`
  width: 500px;
  border: 1px solid black;
  display: flex;
  margin: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Poster = styled.img`
  width: 50%;
  margin-right: 20px;
  display: flex;
`;

const TicketData = styled.div`
  width: 50%;
`;

const TicketImage = (props) => {

  console.log('props TicketImage', props)

  return (
    <div>
      <h1>TicketImage</h1>
      <PosterArea>
        <Poster src={`https://ipfs.io/ipfs/${props.posterUri}`} alt="poster img"></Poster>
        <TicketData>
          <p>제목</p>
          <p>날짜</p>
          <p>장소</p>
          <p>시간</p>
          <p>관람 연령</p>
          <p>가격</p>
        </TicketData>
      </PosterArea>
    </div>
  );
};

export default TicketImage;
