import React from "react";
import styled from "styled-components";

import MiddleLeft from "./MiddleLeft";
import MiddleRight from "./MiddleRight";

const MiddleCss = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  margin-top: 50px;
`;

const MiddleLeftCss = styled.div`
  width: 670px;
  background-color: #fdebd0;
`;

const MiddleRightCss = styled.div`
  width: 330px;
  background-color: #bfc9ca;
`;

const Middle = () => {
  return (
    <div>
      <MiddleCss>
        <MiddleLeftCss>
          <MiddleLeft></MiddleLeft>
        </MiddleLeftCss>

        <MiddleRightCss>
          <MiddleRight></MiddleRight>
        </MiddleRightCss>
      </MiddleCss>
    </div>
  );
};

export default Middle;
