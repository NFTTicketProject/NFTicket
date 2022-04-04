// import Carousel from 'react-material-ui-carousel';
import React from "react";
import styled from "styled-components";
// import {Styled_Slide} from "./Thumbnail.css"

import HomeSlider from "../components/Home/Slider";
import TodayPerformance from "../components/Home/TodayPerformance";
import SpecialTicket from "../components/Home/SpecialTicket";
import Ticketo from "../components/Home/Ticketo";
// import Community from "../components/Home/Community";
import Footer from "../components/Footer";

const TotalWrapDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

const ContentWrapDiv = styled.div`
  padding-bottom: 16rem;
`;

const Home = () => {
  return (
    <TotalWrapDiv>
      <ContentWrapDiv>
        <HomeSlider></HomeSlider>
        <TodayPerformance></TodayPerformance>
        <SpecialTicket></SpecialTicket>
        <Ticketo></Ticketo>
        {/* <Community></Community> */}

        <Footer />
      </ContentWrapDiv>
    </TotalWrapDiv>
  );
};

export default Home;
