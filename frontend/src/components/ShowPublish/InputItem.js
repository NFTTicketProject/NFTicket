import React from "react";
import styled from "styled-components";

const ContainSpan = styled.div`
  margin-top: 10px;
`;

const StyledSpan = styled.span`
  margin: 10px;
  margin-right: 2px;
  font-size: 14px;
`;

const StyledBoldSpan = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

function InputItem({ grade, price, seats }) {
  return (
    <div>
      <ContainSpan>
        <StyledSpan>등급: </StyledSpan>
        <StyledBoldSpan>{grade}</StyledBoldSpan>
        <StyledSpan>가격: </StyledSpan>
        <StyledBoldSpan>{price}</StyledBoldSpan>
        <StyledSpan>발행 수: </StyledSpan>
        <StyledBoldSpan>{seats}</StyledBoldSpan>
      </ContainSpan>
    </div>
  );
}

export default InputItem;
