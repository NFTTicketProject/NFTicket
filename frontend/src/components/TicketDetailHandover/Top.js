import React from "react";
import styled from "styled-components";

import TopLeft from "./TopLeft";
import TopRight from "./TopRight";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  margin-top: 50px;
`;

const TopLeftCss = styled.div`
  width: 400px;
  background-color: #fdebd0;
`;

const TopRightCss = styled.div`
  width: 600px;
  background-color: #bfc9ca;
`;

const Top = () => {
  return (
    <div>
      <TopCss>
        <TopLeftCss>
          <TopLeft></TopLeft>
        </TopLeftCss>

        <TopRightCss>
          <TopRight></TopRight>
        </TopRightCss>
      </TopCss>
    </div>
  );
};

export default Top;
