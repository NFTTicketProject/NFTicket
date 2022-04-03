/* eslint-disable */
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import Perform2 from "../components/Home/Perform2"; // 임시

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { web3, showScheduleAbi, showScheduleManagerContract } from "../utils/web3";

const Market = () => {
  const [category, SetCategory] = useState("전체");
  const [currentSelling, SetCurrentSelling] = useState("전체");
  const [showList, SetShowList] = useState([]);
  const [showListSearch, SetShowListSearch] = useState([]);

  const categories = ["전체", "SF", "옵션1", "test"];

  // 초기정보
  useEffect(() => {
    axios
      // .get(`http://localhost:3000/show/search`)
      .get(`https://nfticket.plus/api/v1/show/search`)
      .then((res) => {
        for (let show of res.data) {
          // 일단은 임시로 받는다.
          // console.log(show)
          var address = "0x47D29af088A908902a55A5442781E73b86f69EB9";
          callShowDetail(address, show.show_id, show.name, show.poster_uri);
        }
      })
      .catch((err) => console.error(err));
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
        dateStart.getFullYear() + "." + dateStart.getMonth() + "." + dateStart.getDate();
      const endAt = await showScheduleContract.methods.getEndedAt().call();
      var dateEnd = new Date(endAt * 1000);
      var dateEndString =
        dateEnd.getFullYear() + "." + dateEnd.getMonth() + "." + dateEnd.getDate();
      var now = new Date();
      // console.log("날짜비교", now.getTime(), dateEnd.getTime(), dateStart.getTime())

      var price = 987654321;
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassPrice = await showScheduleContract.methods.getTicketClassPrice(i).call();
        if (ticketClassPrice <= price) price = ticketClassPrice;
      }
      SetShowList((showList) => [
        ...showList,
        { stageSellerName, stageName, dateStartString, dateEndString, price, id, name, poster_uri },
      ]);
      SetShowListSearch((showListSearch) => [
        ...showListSearch,
        { stageSellerName, stageName, dateStartString, dateEndString, price, id, name, poster_uri },
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

  const onSubmitCategory = async (newValue) => {
    if (newValue === "전체") newValue = "";
    axios
      // .get(`http://localhost:3000/show/search?category_name=${newValue}`)
      .get(`https://nfticket.plus/api/v1/show/search?category_name=${newValue}`)
      .then((res) => {
        SetShowList([]);
        SetShowListSearch([]);
        for (let show of res.data) {
          // 일단은 임시로 받는다.
          // console.log(show)
          var address = "0x47D29af088A908902a55A5442781E73b86f69EB9";
          callShowDetail(address, show.show_id, show.name, show.poster_uri);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 style={{ justifyContent: "center" }}>Market 페이지</h1>
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
          <div>
            <div style={{ padding: "10px" }}>판매상태</div>
            <Autocomplete
              value={currentSelling}
              onChange={(event, newValue) => {
                SetCurrentSelling(newValue);
                onSubmitCategory(newValue);
              }}
              id="controllable-states-demo"
              options={categories}
              renderInput={(params) => <TextField {...params} label="판매상태" />}
              size="small"
            />
          </div>
        </Grid>
        <Grid container xs={10}>
          {showListSearch.map((show) => (
            <Grid item xs={3}>
              <Perform2
                key={show.id}
                name={show.name}
                show_id={show.id}
                poster_uri={show.poster_uri}
                stageSellerName={show.stageSellerName}
                stageName={show.stageName}
                dateStartString={show.dateStartString}
                dateEndString={show.dateEndString}
                price={show.price}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Market;
