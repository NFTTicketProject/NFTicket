// import Carousel from 'react-material-ui-carousel';
import React from "react";
import styled from 'styled-components';
// import {Styled_Slide} from "./Thumbnail.css"

import HomeSlider from '../components/Home/Slider';
import TodayPerformance from "../components/Home/TodayPerformance";
import SpecialTicket from "../components/Home/SpecialTicket";
import Ticketo from "../components/Home/Ticketo";
import Community from "../components/Home/Community";
import Footer from "../components/Footer";


const Home = ()=>{


    styled.div`
      display: flex;
      justifyContent: center;
    `;

  
    
    return (
      <div style={{ justifyContent: "center" }}>
        <HomeSlider></HomeSlider>
        <TodayPerformance></TodayPerformance>
        <SpecialTicket></SpecialTicket>
        <Ticketo></Ticketo>
        <Community></Community>

        <Footer/>
          
      </div>
      
    );
}


export default Home