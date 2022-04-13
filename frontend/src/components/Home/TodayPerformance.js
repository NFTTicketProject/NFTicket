import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Grid, Container } from "@mui/material";
import axios from "axios";
import HomeShow from "./HomeShow";

const TodayPerformContainer = styled.div`
  display: flex-column;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 90px;
  background-color: #f5f5f5;
`;

const PerformBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75vw;
  justify-content: center;
`;

const StyledTodayPerformanceLink = styled(Link)`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  margin-top: 60px;
  margin-bottom: 50px;
  text-decoration: none;
  color: black;
`;

const TodayPerformance = () => {
  const [showList, SetShowList] = useState([]);

  // 초기정보
  useEffect(() => {
    var count = 8;
    axios
      .get(`https://nfticket.plus/api/v1/show/`)
      .then((res) => {
        var tmp = [];
        if (count > res.data.length) {
          count = res.data.length;
        }
        for (let i = 0; i < count; i++) {
          var j = count - i - 1;
          tmp.push(res.data[j]);
        }
        SetShowList(tmp);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(showList);

  return (
    <TodayPerformContainer>
      <StyledTodayPerformanceLink to="Show">🎪 오늘의 공연</StyledTodayPerformanceLink>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={1}>
          {showList.map((v, i) => {
            return (
              <Grid item xs={3}>
                <HomeShow key={i} {...v} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </TodayPerformContainer>
  );
};

export default TodayPerformance;
