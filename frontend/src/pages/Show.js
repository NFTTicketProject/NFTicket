/* eslint-disable */
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PerformShow from "../components/Home/PerformShow";

import axios from "axios";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  web3,
  showScheduleAbi,
  showScheduleManagerContract,
} from "../utils/web3Config";

const TotalWidthSetting = styled.div`
  width: 1400px;
  padding-bottom: 100px;
  margin: auto;
`;

const UpperTitleArea = styled.div`
  margin: 40px;
  font-size: 36px;
  font-weight: bold;
  margin-left: 110px;
  margin-bottom: 50px;
`;

const TotalWrapJustifyCenter = styled.div`
  display: flex;
  justify-content: left;
`;

const SearchBarCategoryArea = styled.div`
  width: 400px;
`;

const CategoryBarDiv = styled.div`
  margin: 20px 0 0 38px;
  width: 300px;
`;

const ShowListArea = styled.div`
  width: 800px;
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
      const scheduleCount = await showScheduleManagerContract.methods
        .getCount()
        .call();

      const tmpContractArray = [];
      for (let i = 1; i <= scheduleCount; i++) {
        const showSchedule = await showScheduleManagerContract.methods
          .getShowSchedule(i)
          .call();
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
      const response = await axios.get(
        `https://nfticket.plus/api/v1/profile/nickname/${wallet}`,
      );
      return response.data.nickname;
    } catch (err) {
      return "NFTicket";
    }
  };

  const callShowDetail = async (address, id, name, poster_uri) => {
    try {
      const stageSeller = await showScheduleManagerContract.methods
        .ownerOf(id)
        .call();
      var stageSellerName = await getUserNickname(stageSeller);
      const showScheduleContract = new web3.eth.Contract(
        showScheduleAbi,
        address,
      );
      // const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods
        .getStageName()
        .call();
      const ticketClassCount = await showScheduleContract.methods
        .getTicketClassCount()
        .call();
      // const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      // const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const startAt = await showScheduleContract.methods.getStartedAt().call();
      var dateStart = new Date(startAt * 1000);
      var dateStartString =
        dateStart.getFullYear() +
        "." +
        (dateStart.getMonth() + 1) +
        "." +
        dateStart.getDate();
      const endAt = await showScheduleContract.methods.getEndedAt().call();
      var dateEnd = new Date(endAt * 1000);
      var dateEndString =
        dateEnd.getFullYear() +
        "." +
        (dateEnd.getMonth() + 1) +
        "." +
        dateEnd.getDate();
      // var now = new Date();
      // console.log("날짜비교", now.getTime(), dateEnd.getTime(), dateStart.getTime())

      var price = 987654321;
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassPrice = await showScheduleContract.methods
          .getTicketClassPrice(i)
          .call();
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
        if (
          show.name.includes(keyword) | show.stageSellerName.includes(keyword)
        ) {
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
      .get(
        `https://nfticket.plus/api/v1/show/search?include_address=1&category_name=${newValue}`,
      )
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
    <TotalWidthSetting>
      <UpperTitleArea>공연 목록</UpperTitleArea>
      <TotalWrapJustifyCenter>
        {/* <h1 style={{ justifyContent: "center" }}>공연 페이지</h1> */}
        <SearchBarCategoryArea>
          <TextField
            id='search'
            label='크리에이터 또는 제목'
            variant='standard'
            onChange={searchKeyword}
            sx={{ ml: 5, width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type='submit' aria-label='search'>
                    <SearchIcon style={{ color: "#000000" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CategoryBarDiv>
            <Autocomplete
              value={category}
              onChange={(event, newValue) => {
                SetCategory(newValue);
                onSubmitCategory(newValue);
              }}
              id='controllable-states-demo'
              options={categories}
              renderInput={(params) => (
                <TextField {...params} label='카테고리' />
              )}
              size='small'
            />
          </CategoryBarDiv>

          {/* <CategoryBarDiv>
            <Autocomplete
              value={currentSelling}
              onChange={(event, newValue) => {
                SetCurrentSelling(newValue);
                onSubmitCategory(newValue);
              }}
              id='controllable-states-demo'
              options={categories}
              renderInput={(params) => (
                <TextField {...params} label='판매상태' />
              )}
              size='small'
            />
          </CategoryBarDiv> */}
        </SearchBarCategoryArea>
        <ShowListArea>
          <Grid container spacing={3} rowSpacing={6}>
            {showListSearch.map((show, idx) => (
              <Grid item xs={4} key={idx}>
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
        </ShowListArea>
      </TotalWrapJustifyCenter>
    </TotalWidthSetting>
  );
};

export default Show;
