import React from "react";
import styled from 'styled-components';

import Seat from "../components/Purchase/Seat";
import SeatInfo from "../components/Purchase/SeatInfo";


const Purchase = ()=>{

    styled.div`
      display: flex;
      justifyContent: center;
    `;

    return (

      <div style={{ justifyContent: "center" }}>
        <h1>Purchase 페이지</h1>
        
        <SeatInfo></SeatInfo>
        <Seat></Seat>
    
      </div>
      
    );
}


export default Purchase