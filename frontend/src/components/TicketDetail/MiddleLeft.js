import React, { useState } from "react";
import styled from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #939393;
`;

const NavListItem = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
`;

const NavListItemSelected = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  font-weight: bold;
`;

const TitleText = styled.h2`
  margin-left: 20px;
`;

const DescriptionDiv = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const MiddleLeft = (props) => {
  const [pageNum, setPageNum] = useState(1);

  const handlePageNum = (page) => {
    setPageNum(page);
  };

  return (
    <div>
      <NavList>
        {pageNum === 1 ? (
          <NavListItemSelected onClick={() => handlePageNum(1)}>공연 정보</NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(1)}>공연 정보</NavListItem>
        )}
        {pageNum === 2 ? (
          <NavListItemSelected onClick={() => handlePageNum(2)}>캐스팅 정보</NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(2)}>캐스팅 정보</NavListItem>
        )}
        {/* {pageNum === 3 ? (
          <NavListItemSelected onClick={() => handlePageNum(3)}>공연장 정보</NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(3)}>공연장 정보</NavListItem>
        )} */}
      </NavList>

      {pageNum === 1 && (
        <div>
          <TitleText>상세 정보</TitleText>
          <DescriptionDiv>{props.description}</DescriptionDiv>
        </div>
      )}
      {pageNum === 2 && (
        <div>
          <TitleText>캐스팅 정보</TitleText>
          <DescriptionDiv>{props.casting}</DescriptionDiv>
        </div>
      )}
      {/* {pageNum === 3 && (
        <div>
          <TitleText>공연장 정보</TitleText>
          <DescriptionDiv>{props.hallDescription}</DescriptionDiv>
        </div>
      )} */}
    </div>
  );
};

export default MiddleLeft;
