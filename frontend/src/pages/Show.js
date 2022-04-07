/* eslint-disable */
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PerformShow from "../components/Home/PerformShow";

import axios from "axios";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { web3, showScheduleAbi, showScheduleManagerContract } from "../utils/web3Config";

const UpperTitleArea = styled.div`
  margin: 40px;
  font-size: 32px;
  font-weight: bold;
  margin-left: 90px;
  margin-bottom: 50px;
`;

const Show = () => {
  const [contractSchedule, setContractSchedule] = useState([]);
  const [category, SetCategory] = useState("전체");
  const [currentSelling, SetCurrentSelling] = useState("전체");
  const [showList, SetShowList] = useState([]);
  const [showListSearch, SetShowListSearch] = useState([]);

  const categories = ["전체", "SF", "옵션1", "test"];

  const getShowScheduleAddress = async () => {
    try {
      const scheduleCount = await showScheduleManagerContract.methods.getCount().call();

      const tmpContractArray = [];
      for (let i = 1; i <= scheduleCount; i++) {
        const showSchedule = await showScheduleManagerContract.methods.getShowSchedule(i).call();
        tmpContractArray.push(showSchedule);
        // localStorage에 showScheduleId를 저장해둔다. - myTicket.sol에서 create하기 위해
        localStorage.setItem(showSchedule, `${i}`);
      }
      setContractSchedule(tmpContractArray);
    } catch (err) {
      console.error(err);
    }
  };

  // 초기정보
  useEffect(() => {
    getShowScheduleAddress();

    axios
      .get(`https://nfticket.plus/api/v1/show/search`)
      .then((res) => {
        console.log("초기값", res.data);
        for (let show of res.data) {
          console.log("공연", show);
          var address = show.show_schedule_address[0];
          if (!address) address = "0x7fda176A47EBa05A4fD2F6C95339164ab2817883";
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
        dateStart.getFullYear() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getDate();
      const endAt = await showScheduleContract.methods.getEndedAt().call();
      var dateEnd = new Date(endAt * 1000);
      var dateEndString =
        dateEnd.getFullYear() + "." + (dateEnd.getMonth() + 1) + "." + dateEnd.getDate();
      // var now = new Date();
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

  const onSubmitCategory = async (newValue) => {
    if (newValue === "전체") newValue = "";
    axios
      // .get(`http://localhost:3000/show/search?category_name=${newValue}`)
      .get(`https://nfticket.plus/api/v1/show/search?include_address=1&category_name=${newValue}`)
      .then((res) => {
        SetShowList([]);
        SetShowListSearch([]);
        for (let show of res.data) {
          var address = show.show_schedule_address[0];
          if (!address) address = "0x7fda176A47EBa05A4fD2F6C95339164ab2817883";
          callShowDetail(address, show.show_id, show.name, show.poster_uri);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <UpperTitleArea>공연 목록</UpperTitleArea>
      {/* <h1 style={{ justifyContent: "center" }}>공연 페이지</h1> */}
      <Grid container spacing={2}>
        <Grid item container spacing={0} xs={2} direction="column">
          <Grid item container direction="row">
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Paper
                component="form"
                elevation={0}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <TextField
                  id="search"
                  label="크리에이터 또는 제목"
                  variant="standard"
                  onChange={searchKeyword}
                />
              </Paper>
              <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ color: "#B2BABB" }} />
              </IconButton>
            </Grid>

            <Grid item xs={2}></Grid>
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
          {/* <div>
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
            </div> */}
        </Grid>
        <Grid container xs={10}>
          {showListSearch.map((show) => (
            <Grid item xs={3}>
              <PerformShow
                key={show.id}
                name={show.name}
                show_id={show.id}
                poster_uri={show.poster_uri}
                stageSellerName={show.stageSellerName}
                stageName={show.stageName}
                dateStartString={show.dateStartString}
                dateEndString={show.dateEndString}
                price={show.price}
                address={show.address}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Show;
