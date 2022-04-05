import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Grid, Container } from "@mui/material";
import axios from "axios";
import HomeShow from "./HomeShow";

const TodayPerformContainer = styled.div`
  display: flex-column;
  justify-content: center;
  margin-top: 50px;
  background-color: #f5f5f5;
`;

const PerformBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75vw;
  justify-content: center;
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
        if (count > res.data.length) count = res.data.length;
        for (let i = 0; i < count; i++) {
          var j = count - i - 1;
          tmp.push(res.data[j]);
        }
        SetShowList(tmp);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <TodayPerformContainer>
      <hr />
      <h1 style={{ display: "flex", justifyContent: "center", fontSize: "48px" }}>
        최신 인기 공연
      </h1>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
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
