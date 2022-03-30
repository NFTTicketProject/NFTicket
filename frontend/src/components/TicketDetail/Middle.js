import React from "react";
import styled from "styled-components";

import MiddleLeft from "./MiddleLeft";
import MiddleRight from "./MiddleRight";

const ContainMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const MiddleLeftCss = styled.div`
  width: 670px;
`;

const MiddleRightCss = styled.div`
  width: 330px;
  height: 100px;
`;

const Middle = () => {
  return (
    <div>
      <ContainMiddle>
        <MiddleLeftCss>
          <MiddleLeft></MiddleLeft>
        </MiddleLeftCss>

        <MiddleRightCss>
          <MiddleRight></MiddleRight>
        </MiddleRightCss>
      </ContainMiddle>
    </div>
  );
};

export default Middle;
