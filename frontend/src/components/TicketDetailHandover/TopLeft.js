import React from "react";
import styled from "styled-components";

const PosterArea = styled.div`
  width: 500px;
  margin-left: 20px;
`;

const Poster = styled.img`
  width: 100%;
`;

const TopLeft = (props) => {
  return (
    <div>
      <PosterArea>
        <Poster src={props.posterUri} alt="poster img"></Poster>
      </PosterArea>
    </div>
  );
};

export default TopLeft;
