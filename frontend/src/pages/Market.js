/* eslint-disable */
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import PerformTicket from "../components/Home/PerformTicket"; // 임시
import swal from "sweetalert2";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  web3,
  showScheduleAbi,
  showScheduleManagerContract,
  ticketSaleManagerContract,
  ticketSaleAbi,
  myTicketContract,
} from "../utils/web3Config";

const TotalWidthSetting = styled.div`
  width: 1400px;
  padding-bottom: 100px;

  margin: auto;
`;

const UpperTitleArea = styled.div`
  margin: 40px;
  font-size: 36px;
  font-weight: 700;
  margin-left: 90px;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const TotalWrapJustifyCenter = styled.div`
  display: flex;
  justify-content: left;
`;

const SearchBarCategoryArea = styled.div`
  width: 400px;
  margin-left: 50px;
`;

const CategoryBarDiv = styled.div`
  margin: 40px 0 0 38px;
  width: 300px;
`;

const TicketListArea = styled.div`
  width: 800px;
  margin-top: 20px;
`;

const Market = ({ getAccount, account }) => {
  const navigate = useNavigate();
  ////
  const [isBuyable, setIsBuyable] = useState(false); // 주인은 살 수 없도록 버튼 비활성화용
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  ////
  // console.log(userData)
  const checkAccount = async () => {
    try {
      if (!localStorage.getItem("userAccount")) {
        swal
          .fire({
            title: "지갑을 연결해주세요.",
            icon: "warning",
            closeOnClickOutside: false,
          })
          .then(function () {
            // 이벤트
            navigate("/MyPage");
            // alert('hello')
          });
        // alert('hello')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTicketOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .ownerOf(animalTokenId)
        .call();
      // console.log(response);
      // console.log(account);
      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase(),
      ); // 대소문자가 달라서... 처리 필요
    } catch (err) {
      console.error(err);
    }
  };
  ////
  const [category, SetCategory] = useState("전체");
  const [saleTicketArray, setSaleTicketArray] = useState([]);
  const [saleTicketSearchArray, setSaleTicketSearchArray] = useState([]);

  const categories = [
    "전체",
    "뮤지컬",
    "콘서트",
    "연극",
    "클래식/무용",
    "스포츠",
    "기타",
  ];

  const getTicketOnSale = async () => {
    try {
      const cnt = await myTicketContract.methods.totalSupply().call();
      const ticketInfos = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods
          .getSaleOfTicket(i)
          .call();
        // console.log("🐸", saleAddr);
        if (saleAddr != "0x0000000000000000000000000000000000000000") {
          const showScheduleId = await myTicketContract.methods
            .getShowScheduleId(i)
            .call();
          if (showScheduleId == 0) continue;
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
          const showInfo = await axios.get(
            `https://nfticket.plus/api/v1/show/${showId}`,
          );
          // console.log("showInfo", showId, showInfo)
          const ticketUri = await myTicketContract.methods
            .getTokenURI(i)
            .call();
          const categoryName = showInfo.data.category_name;
          const ticketSaleContract = new web3.eth.Contract(
            ticketSaleAbi,
            saleAddr,
          );
          // 공연 발매자
          const stageSeller = await showScheduleManagerContract.methods
            .ownerOf(i)
            .call();
          // var stageSellerName = await getUserNickname(stageSeller);
          // 티켓 소유자
          // const ticketSeller = await ticketSaleManagerContract.methods.ownerOf(i).call();
          const ticketSeller = await ticketSaleContract.methods
            .getSeller()
            .call();
          const description = await ticketSaleContract.methods
            .getDescription()
            .call();
          var ticketSellerName = await getUserNickname(ticketSeller);

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

          var cate = category;
          if (cate === "전체") cate = "";
          // console.log("이후", cate);
          // console.log("정보", categoryName, cate, categoryName.includes(cate));
          if (!categoryName.includes(cate)) continue;
          // console.log("showInfo", showInfo);

          //
          const sellerOfTicket = await ticketSaleContract.methods
            .getSeller()
            .call();
          var stageSellerName = await getUserNickname(sellerOfTicket);

          // const response = await mintAnimalTokenContract.methods.ownerOf(ticketId).call();
          // console.log(response);
          // console.log(account);
          // 판매 종료 여부
          const isEnded = await ticketSaleContract.methods.isEnded().call();
          const buyable = await (ticketSeller.toLocaleLowerCase() ===
            userData.account.toLocaleLowerCase());
          // setIsBuyable(ticketSeller.toLocaleLowerCase() === userData.account.toLocaleLowerCase()); // 대소문자가 달라서... 처리 필요

          ticketInfos.push({
            ticketId: i,
            saleAddr,
            showId,
            stageSellerName,
            ticketSellerName,
            ticketUri,
            name: showInfo.data.name,
            price,
            dateStartString,
            dateEndString,
            sellerOfTicket,
            buyable,
            isEnded,
            endAt,
            description,
          });
        }
      }
      setSaleTicketArray(ticketInfos);
      setSaleTicketSearchArray(ticketInfos);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(saleTicketArray)

  const getTicketOnSaleCategory = async (category) => {
    try {
      const cnt = await myTicketContract.methods.totalSupply().call();
      const ticketInfos = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods
          .getSaleOfTicket(i)
          .call();
        // console.log("🐸", saleAddr);
        if (saleAddr != "0x0000000000000000000000000000000000000000") {
          const showScheduleId = await myTicketContract.methods
            .getShowScheduleId(i)
            .call();
          if (showScheduleId == 0) continue;
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
          const showInfo = await axios.get(
            `https://nfticket.plus/api/v1/show/${showId}`,
          );
          // console.log("showInfo", showId, showInfo)
          const ticketUri = await myTicketContract.methods
            .getTokenURI(i)
            .call();
          const categoryName = showInfo.data.category_name;
          const ticketSaleContract = new web3.eth.Contract(
            ticketSaleAbi,
            saleAddr,
          );
          // 공연 발매자
          const stageSeller = await showScheduleManagerContract.methods
            .ownerOf(i)
            .call();
          // var stageSellerName = await getUserNickname(stageSeller);
          // 티켓 소유자
          // const ticketSeller = await ticketSaleManagerContract.methods.ownerOf(i).call();
          const ticketSeller = await ticketSaleContract.methods
            .getSeller()
            .call();
          var ticketSellerName = await getUserNickname(ticketSeller);
          const description = await ticketSaleContract.methods
            .getDescription()
            .call();
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

          var cate = category;
          if (cate === "전체") cate = "";
          // console.log("이후", cate);
          // console.log("정보", categoryName, cate, categoryName.includes(cate));
          if (!categoryName.includes(cate)) continue;
          // console.log("showInfo", showInfo);

          //
          const sellerOfTicket = await ticketSaleContract.methods
            .getSeller()
            .call();
          var stageSellerName = await getUserNickname(sellerOfTicket);

          // const response = await mintAnimalTokenContract.methods.ownerOf(ticketId).call();
          // console.log(response);
          // console.log(account);
          // 판매 종료 여부
          const isEnded = await ticketSaleContract.methods.isEnded().call();
          const buyable = await (ticketSeller.toLocaleLowerCase() ===
            userData.account.toLocaleLowerCase());
          // setIsBuyable(ticketSeller.toLocaleLowerCase() === userData.account.toLocaleLowerCase()); // 대소문자가 달라서... 처리 필요

          ticketInfos.push({
            ticketId: i,
            saleAddr,
            showId,
            stageSellerName,
            ticketSellerName,
            ticketUri,
            name: showInfo.data.name,
            price,
            dateStartString,
            dateEndString,
            sellerOfTicket,
            buyable,
            isEnded,
            endAt,
            description,
          });
        }
      }
      setSaleTicketArray(ticketInfos);
      setSaleTicketSearchArray(ticketInfos);
    } catch (err) {
      console.error(err);
    }
    // 백업용
    // try {
    //   const cnt = await myTicketContract.methods.totalSupply().call();
    //   // console.log(cnt);
    //   const ticketInfos = [];
    //   for (let i = 1; i < parseInt(cnt) + 1; i++) {
    //     const saleAddr = await ticketSaleManagerContract.methods.getSaleOfTicket(i).call();
    //     if (saleAddr !== "0x0000000000000000000000000000000000000000") {
    //       const showScheduleId = await myTicketContract.methods.getShowScheduleId(i).call();
    //       const showScheduleAddress = await showScheduleManagerContract.methods
    //         .getShowSchedule(showScheduleId)
    //         .call();
    //       const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
    //       const showId = await showScheduleContract.methods.getShowId().call();
    //       // 공연 발매자
    //       const stageSeller = await showScheduleManagerContract.methods.ownerOf(i).call();

    //       var stageSellerName = await getUserNickname(stageSeller);
    //       // 티켓 소유자
    //       const ticketSeller = await ticketSaleManagerContract.methods.owner().call();

    //       var ticketSellerName = await getUserNickname(ticketSeller);
    //       const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
    //       const ticketUri = await myTicketContract.methods.getTokenURI(i).call();
    //       const categoryName = showInfo.data.category_name;
    //       const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
    //       const price = await ticketSaleContract.methods.getPrice().call();
    //       const startAt = await ticketSaleContract.methods.getStartedAt().call();
    //       var dateStart = new Date(startAt * 1000);
    //       var dateStartString =
    //         dateStart.getFullYear() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getDate();
    //       const endAt = await ticketSaleContract.methods.getEndedAt().call();
    //       var dateEnd = new Date(endAt * 1000);
    //       var dateEndString =
    //         dateEnd.getFullYear() + "." + (dateEnd.getMonth() + 1) + "." + dateEnd.getDate();

    //       var cate = category;
    //       console.log("카테고리", cate);
    //       if ((cate === "전체") | !cate) cate = "";
    //       console.log("카테고리 이후", cate);
    //       if (!categoryName.includes(cate)) continue;

    //       ticketInfos.push({
    //         ticketId: i,
    //         saleAddr,
    //         showId,
    //         stageSellerName,
    //         ticketSellerName,
    //         ticketUri,
    //         name: showInfo.data.name,
    //         price,
    //         dateStartString,
    //         dateEndString,
    //       });
    //     }
    //   }
    //   setSaleTicketArray(ticketInfos);
    //   setSaleTicketSearchArray(ticketInfos);
    // } catch (err) {
    //   console.error(err);
    // }
  };
  // console.log("", isBuyable)
  // 초기정보

  useEffect(() => {
    // getAccount();
    checkAccount();
    getTicketOnSale();
    getTicketOnSaleCategory();
  }, []);

  // useEffect(()=>{
  // }, [account])

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

  const searchKeyword = (e) => {
    var keyword = e.target.value;
    if (keyword) {
      var tmp = [];
      for (let ticket of saleTicketArray) {
        if (
          ticket.name.includes(keyword) |
          ticket.stageSellerName.includes(keyword)
        ) {
          tmp.push(ticket);
        }
      }
      setSaleTicketSearchArray(tmp);
    } else {
      setSaleTicketSearchArray(saleTicketArray);
    }
  };

  // console.log("🐸", saleTicketSearchArray.buyable)
  return (
    <>
      <TotalWidthSetting>
        <UpperTitleArea>
          티켓 🎟{" "}
          <p
            style={{
              marginTop: "18px",
              fontSize: "18px",
              fontWeight: "400",
              marginLeft: "2px",
            }}
          >
            개인 간의 티켓 거래를 이용해보세요 !
          </p>
        </UpperTitleArea>
        <TotalWrapJustifyCenter>
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
                  // onSubmitCategory(newValue);
                }}
                id='controllable-states-demo'
                options={categories}
                renderInput={(params) => (
                  <TextField {...params} label='카테고리' />
                )}
                size='small'
              />
            </CategoryBarDiv>
          </SearchBarCategoryArea>
          <TicketListArea>
            <Grid container spacing={3} rowSpacing={6}>
              {saleTicketSearchArray.map((ticket, idx) => (
                <Grid item xs={4} key={idx}>
                  <PerformTicket
                    key={ticket.ticketId}
                    id={ticket.ticketId}
                    ticketUri={ticket.ticketUri}
                    saleAddr={ticket.saleAddr}
                    stageSellerName={ticket.stageSellerName}
                    ticketSellerName={ticket.ticketSellerName}
                    name={ticket.name}
                    price={ticket.price}
                    dateStartString={ticket.dateStartString}
                    dateEndString={ticket.dateEndString}
                    buyable={ticket.buyable}
                    isEnded={ticket.isEnded}
                    endAt={ticket.endAt}
                    description={ticket.description}
                  />
                </Grid>
              ))}
            </Grid>
          </TicketListArea>
        </TotalWrapJustifyCenter>
      </TotalWidthSetting>
    </>
  );
};

export default Market;
