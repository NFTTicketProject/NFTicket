import React from "react";
import styled from "styled-components";

const PosterDetail = styled.img`
  width: 100%;
`;

const TitleText = styled.h2`
  margin-left: 20px;
`;

const DetailDescription = () => {
  return (
    <div>
      <TitleText>상세 정보</TitleText>
      <PosterDetail src='images/AIDA.jpg' alt='poster img'></PosterDetail>
    </div>
  );
};

export default DetailDescription;
