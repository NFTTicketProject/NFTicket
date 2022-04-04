import React from "react";
import styled from "styled-components";

import GuideBody from "../components/guide/GuideBody";
import GuideHeader from "../components/guide/GuideHeader";
import GuideTitle from "../components/guide/GuideTitle";
import Footer from "../components/Footer";

const TotalWrapDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

const ContentWrapDiv = styled.div`
  padding-bottom: 16rem;
`;

const Guide = () => {
  return (
    <TotalWrapDiv>
      <ContentWrapDiv>
        <GuideHeader></GuideHeader>
        <GuideTitle></GuideTitle>
        <GuideBody></GuideBody>
      </ContentWrapDiv>

      <Footer></Footer>
    </TotalWrapDiv>
  );
};

export default Guide;
