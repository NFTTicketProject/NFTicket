/* eslint-disable */
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import PerformTicket from "../components/Home/PerformTicket"; // 임시

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import {
  web3,
  showScheduleAbi,
  showScheduleManagerContract,
  ticketSaleManagerContract,
  myTicketContract,
} from "../utils/web3Config";

const Market = () => {
  const [category, SetCategory] = useState("전체");
  const [saleTicketArray, setSaleTicketArray] = useState([]);

  const categories = ["전체", "SF", "옵션1", "test"];

  const getTicketOnSale = async () => {
    try {
      const cnt = await ticketSaleManagerContract.methods.getCount().call();
      console.log(cnt);
      const tempAddress = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSale(i).call();
        tempAddress.push({ saleAddr });
      }
      console.log("tempaddress", tempAddress);
      setSaleTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const getTicketOnSale2 = async () => {
    try {
      const cnt = await myTicketContract.methods.totalSupply().call();
      console.log(cnt);
      const tempAddress = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSaleOfTicket(i).call();
        if (saleAddr != "0x0000000000000000000000000000000000000000") {
          const showScheduleId = await myTicketContract.methods.getShowScheduleId(i).call();
          const showScheduleAddress = await showScheduleManagerContract.methods
            .getShowSchedule(showScheduleId)
            .call();
          const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
          const showId = await showScheduleContract.methods.getShowId().call();
          // 공연 발매자
          const stageSeller = await showScheduleManagerContract.methods.ownerOf(showId).call();
          var stageSellerName = await getUserNickname(stageSeller);
          // 티켓 소유자
          const ticketSeller = await ticketSaleManagerContract.methods.ownerOf(i).call();
          var ticketSellerName = await getUserNickname(ticketSeller);
          const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
          const ticketUri = await myTicketContract.methods.getTokenURI(i).call();
          const categoryName = showInfo.data.category_name;
          var cate = category;
          if (cate === "전체") cate = "";
          // console.log("정보", categoryName, cate, categoryName.includes(cate));
          if (!categoryName.includes(cate)) continue;
          console.log("showInfo", showInfo);

          // var price = 987654321;
          // for (let i = 0; i < ticketClassCount; i++) {
          //   const ticketClassPrice = await showScheduleContract.methods.getTicketClassPrice(i).call();
          //   if (ticketClassPrice <= price) price = ticketClassPrice;
          // }

          tempAddress.push({ ticketId: i, saleAddr, showId, stageSellerName, ticketSellerName, ticketUri, name: showInfo.data.name });
        }
      }
      console.log("tempaddress", tempAddress);
      setSaleTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  // 초기정보
  useEffect(() => {
    getTicketOnSale2();
  }, []);

  const getUserNickname = async (wallet) => {
    try {
      const response = await axios.get(`https://nfticket.plus/api/v1/profile/nickname/${wallet}`);
      return response.data.nickname;
    } catch (err) {
      return "NFTicket";
    }
  };

  const callShowDetail = async (address, id, name, poster_uri) => {
    try {
      const stageSeller = await showScheduleManagerContract.methods.ownerOf(id).call();
      var stageSellerName = await getUserNickname(stageSeller);
      const showScheduleContract = new web3.eth.Contract(showScheduleAbi, address);
      // const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      // const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      // const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const startAt = await showScheduleContract.methods.getStartedAt().call();
      var dateStart = new Date(startAt * 1000);
      var dateStartString =
        dateStart.getFullYear() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getDate();
      const endAt = await showScheduleContract.methods.getEndedAt().call();
      var dateEnd = new Date(endAt * 1000);
      var dateEndString =
        dateEnd.getFullYear() + "." + (dateEnd.getMonth() + 1) + "." + dateEnd.getDate();
      var now = new Date();
      // console.log("날짜비교", now.getTime(), dateEnd.getTime(), dateStart.getTime())

      var price = 987654321;
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassPrice = await showScheduleContract.methods.getTicketClassPrice(i).call();
        if (ticketClassPrice <= price) price = ticketClassPrice;
      }
      SetShowList((showList) => [
        ...showList,
        {
          stageSellerName,
          stageName,
          dateStartString,
          dateEndString,
          price,
          id,
          name,
          poster_uri,
          address,
        },
      ]);
      SetShowListSearch((showListSearch) => [
        ...showListSearch,
        {
          stageSellerName,
          stageName,
          dateStartString,
          dateEndString,
          price,
          id,
          name,
          poster_uri,
          address,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const searchKeyword = (e) => {
    var keyword = e.target.value;
    if (keyword) {
      var tmp = [];
      for (let show of showList) {
        if (show.name.includes(keyword) | show.stageSellerName.includes(keyword)) {
          tmp.push(show);
        }
      }
      SetShowListSearch(tmp);
    } else {
      SetShowListSearch(showList);
    }
  };

  return (
    <div>
      <h1 style={{ justifyContent: "center" }}>개인 티켓 거래 시장</h1>
      <Grid container spacing={2}>
        <Grid item container spacing={0} xs={2} direction="column">
          <Grid item container direction="row">
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <TextField
                id="search"
                label="크리에이터 또는 제목"
                variant="standard"
                onChange={searchKeyword}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          <div>
            <div style={{ padding: "10px" }}>카테고리</div>
            <Autocomplete
              value={category}
              onChange={(event, newValue) => {
                SetCategory(newValue);
                onSubmitCategory(newValue);
              }}
              id="controllable-states-demo"
              options={categories}
              renderInput={(params) => <TextField {...params} label="카테고리" />}
              size="small"
            />
          </div>
        </Grid>
        <Grid container xs={10}>
          {saleTicketArray.map((ticket) => (
            <Grid item xs={3}>
              <PerformTicket
                key={ticket.ticketId}
                id={ticket.ticketId}
                ticketUri={ticket.ticketUri}
                saleAddr={ticket.saleAddr}
                stageSellerName={ticket.stageSellerName}
                ticketSellerName={ticket.ticketSellerName}
                name={ticket.name}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Market;
