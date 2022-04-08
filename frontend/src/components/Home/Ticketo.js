import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Grid, Container } from "@mui/material";
// import TicketoItem from "./TicketoItem";
import HomeTicket from "./HomeTicket";
import axios from "axios";

import {
  web3,
  showScheduleAbi,
  showScheduleManagerContract,
  ticketSaleManagerContract,
  ticketSaleAbi,
  myTicketContract,
} from "../../utils/web3Config";

styled.div`
  display: flex-column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Title = styled.h2`
  display: flex;
  margin-bottom: 4px;
  width: 1180px;
`;

const TicketoItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75vw;
  justify-content: center;
`;

const StyledResellingTicketMallLink = styled(Link)`
  display: flex;
  justify-content: start;
  font-size: 28px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 12px;
  text-decoration: none;
  color: black;
`;

const Ticketo = () => {
  const [ticketList, SetTicketList] = useState([]);

  const getUserNickname = async (wallet) => {
    try {
      const response = await axios.get(
        `https://nfticket.plus/api/v1/profile/nickname/${wallet}`,
      );
      // console.log(response);
      return response.data.nickname;
    } catch (err) {
      return "NFTicket";
    }
  };

  const getTicketOnSale = async () => {
    try {
      var count = 4; // 맥스치
      const cnt = await myTicketContract.methods.totalSupply().call();
      const ticketInfos = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods
          .getSaleOfTicket(i)
          .call();
        if (saleAddr != "0x0000000000000000000000000000000000000000") {
          if (count <= 0) break;
          const showScheduleId = await myTicketContract.methods
            .getShowScheduleId(i)
            .call();
          if (showScheduleId === 0) continue;
          const showScheduleAddress = await showScheduleManagerContract.methods
            .getShowSchedule(showScheduleId)
            .call();
          if (
            showScheduleAddress === "0x0000000000000000000000000000000000000000"
          )
            continue;
          const showScheduleContract = new web3.eth.Contract(
            showScheduleAbi,
            showScheduleAddress,
          );
          const showId = await showScheduleContract.methods.getShowId().call();

          // 공연 발매자
          const stageSeller = await showScheduleManagerContract.methods
            .ownerOf(i)
            .call();
          var stageSellerName = await getUserNickname(stageSeller);
          // 티켓 소유자
          const ticketSeller = await ticketSaleManagerContract.methods
            .owner()
            .call();

          var ticketSellerName = await getUserNickname(ticketSeller);
          const showInfo = await axios.get(
            `https://nfticket.plus/api/v1/show/${showId}`,
          );
          // console.log(showInfo);
          const ticketUri = await myTicketContract.methods
            .getTokenURI(i)
            .call();
          // console.log(ticketUri);
          const ticketSaleContract = new web3.eth.Contract(
            ticketSaleAbi,
            saleAddr,
          );
          const price = await ticketSaleContract.methods.getPrice().call();
          const startAt = await ticketSaleContract.methods
            .getStartedAt()
            .call();
          var dateStart = new Date(startAt * 1000);
          var dateStartString =
            dateStart.getFullYear() +
            "." +
            (dateStart.getMonth() + 1) +
            "." +
            dateStart.getDate();
          const endAt = await ticketSaleContract.methods.getEndedAt().call();
          var dateEnd = new Date(endAt * 1000);
          var dateEndString =
            dateEnd.getFullYear() +
            "." +
            (dateEnd.getMonth() + 1) +
            "." +
            dateEnd.getDate();

          ticketInfos.push({
            ticketId: i,
            saleAddr,
            showId,
            ticketSeller,
            stageSellerName,
            ticketSellerName,
            ticketUri,
            name: showInfo.data.name,
            price,
            dateStartString,
            dateEndString,
          });
          count = count - 1;
        }
      }
      SetTicketList(ticketInfos);
    } catch (err) {
      console.error(err);
    }
  };

  // 초기정보
  useEffect(() => {
    getTicketOnSale();
  }, []);

  return (
    <div style={{ background: "#f5f5f5", paddingBottom: "100px" }}>
      <TitleContainer>
        <div
          style={{ display: "flex-column", width: "60vw", fontSize: "40px" }}
        >
          {/* <div style={{ width: "1180px", display: "flex-column", justifyContent: "center"}}> */}

          <StyledResellingTicketMallLink to="Market">
            리셀링 티켓몰 🤑
          </StyledResellingTicketMallLink>
          <p style={{ display: "flex", justifyContent: "start", fontSize: "20px", fontWeight: "400", marginBottom: "30px" }}>
            개인 간 티켓 거래로 다른 관객들과 NFTicket을 자유롭게 거래해보세요.
          </p>
        </div>
      </TitleContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "start", width: "60vw", flexWrap: "wrap" }}>
          {/* <div style={{ width: "203px", height: "372.5px", backgroundColor: "gray", margin: "14px"}}></div>
          <div style={{ width: "203px", height: "372.5px", backgroundColor: "gray", margin: "14px"}}></div>
          <div style={{ width: "203px", height: "372.5px", backgroundColor: "gray", margin: "14px"}}></div> */}
          {ticketList.map((v, i) => {
            return (
              <HomeTicket key={i} {...v} />
              );
            })}
          {/* <TicketoItemContainer>
            <Grid container spacing={2}>
              {ticketList.map((v, i) => {
                return (
                  <Grid item xs={3}>
                    <HomeTicket key={i} {...v} />
                  </Grid>
                );
              })} 
            </Grid>
          </TicketoItemContainer> */}
        </div>
        </div>
    </div>
  );
};

export default Ticketo;
