import React, { useState } from "react";
import styled from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #939393;
`;

const NavListItem = styled.div`
  margin: 12px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
`;

const NavListItemSelected = styled.div`
  margin: 12px;
  margin-left: 20px;
  margin-right: 20px;
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
          <NavListItemSelected onClick={() => handlePageNum(1)}>
            공연 정보
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(1)}>공연 정보</NavListItem>
        )}
        {pageNum === 2 ? (
          <NavListItemSelected onClick={() => handlePageNum(2)}>
            캐스팅 정보
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(2)}>
            캐스팅 정보
          </NavListItem>
        )}
        {pageNum === 3 ? (
          <NavListItemSelected onClick={() => handlePageNum(3)}>
            공연장 정보
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(3)}>
            공연장 정보
          </NavListItem>
        )}
        {pageNum === 4 ? (
          <NavListItemSelected onClick={() => handlePageNum(4)}>
            관람 후기
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(4)}>관람 후기</NavListItem>
        )}
        {pageNum === 5 ? (
          <NavListItemSelected onClick={() => handlePageNum(5)}>
            티켓 정보
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(5)}>티켓 정보</NavListItem>
        )}
        {pageNum === 6 ? (
          <NavListItemSelected onClick={() => handlePageNum(6)}>
            티켓 거래
          </NavListItemSelected>
        ) : (
          <NavListItem onClick={() => handlePageNum(6)}>티켓 거래</NavListItem>
        )}
      </NavList>

      {pageNum === 1 && (
        <div>
          <TitleText>상세 정보</TitleText>
          <DescriptionDiv>{props.description}</DescriptionDiv>
        </div>
      )}
      {pageNum === 2 && <h2>캐스팅 정보</h2>}
      {pageNum === 3 && <h2>공연장 정보</h2>}
      {pageNum === 4 && <h2>관람 후기</h2>}
      {pageNum === 5 && <h2>티켓 정보</h2>}
      {pageNum === 6 && <h2>티켓 거래</h2>}
    </div>
  );
};

export default MiddleLeft;
