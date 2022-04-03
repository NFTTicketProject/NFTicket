import React from 'react';
import Perform from './Perform';
import styled from 'styled-components';

import { Container, Grid } from "@mui/material";


const TodayPerformance = ()=>{

  const TodayPerformContainer = styled.div`
    display: flex-column;
    justify-content: center;
    margin-top: 50px;
  `;

  const PerformBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 75vw;
    justify-content: center;
  `;


  return (
    <TodayPerformContainer>
      <h1 style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>오늘의 공연</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
          <Grid item lg={1}></Grid>
          <Grid item lg={2}>
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={2} >
            <Perform/>
          </Grid>
          <Grid item lg={1}></Grid>
        </Grid>
      </div>

    
    </TodayPerformContainer>
  );

}

export default TodayPerformance
