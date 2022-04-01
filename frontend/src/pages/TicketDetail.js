import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract } from "../utils/web3";

import axios from "axios";
import styled from "styled-components";

import TopLeft from "../components/TicketDetail/TopLeft";
import TopRight from "../components/TicketDetail/TopRight";
import Middle from "../components/TicketDetail/Middle";
import Bottom from "../components/TicketDetail/Bottom";
import Footer from "../components/Footer";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TopLeftCss = styled.div`
  width: 670px;
  height: 700px;
`;

const TopRightCss = styled.div`
  width: 330px;
  height: 700px;
`;

const TopRightFixed = styled.div`
  width: 330px;
  top: 90px;
  position: fixed;
`;

const MiddleCss = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const BottomCss = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString =
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

const TicketDetail = () => {
  // 스크롤 고정시키기 위한 변수들
  // const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  // function handleScroll() {
  //   if (scrollY > 300) {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(false);
  //   } else {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(true);
  //   }
  // }
  // useEffect(() => {
  //   function scrollListener() {
  //     window.addEventListener("scroll", handleScroll);
  //   } //  window 에서 스크롤을 감시 시작
  //   scrollListener(); // window 에서 스크롤을 감시
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   }; //  window 에서 스크롤을 감시를 종료
  // });

  const { showScheduleAddress } = useParams();
  const showScheduleContract = new web3.eth.Contract(
    showScheduleAbi,
    "0x4c6069672f42f21bAB6e13e60Df121aDF7DafD5E",
  );
  // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [ticketDetail, setTicketDetail] = useState([]);
  const [showDetailBack, setShowDetailBack] = useState({});
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const callShowDetail = async () => {
    try {
      const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods
        .getStageName()
        .call();
      const ticketClassCount = await showScheduleContract.methods
        .getTicketClassCount()
        .call();
      const resellPolicy = await showScheduleContract.methods
        .getResellPolicy()
        .call();
      const maxMintCount = await showScheduleContract.methods
        .getMaxMintCount()
        .call();
      const isCancelled = await showScheduleContract.methods
        .isCancelled()
        .call();
      // 한길 추가, 공연시작과 끝 가져오기
      let startedAt = await showScheduleContract.methods.getStartedAt().call();
      let endedAt = await showScheduleContract.methods.getEndedAt().call();
      // Unix Timestamp를 Date로 바꾸기
      startedAt = unixTimeToDate(startedAt);
      endedAt = unixTimeToDate(endedAt);
      window.localStorage.setItem("isCancelled", isCancelled);
      // console.log(maxMintCount);
      // 티켓 좌석 정보저장
      const tmp = [];
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassName = await showScheduleContract.methods
          .getTicketClassName(i)
          .call();
        const tmpTicketClassPrice = await showScheduleContract.methods
          .getTicketClassPrice(i)
          .call();
        // 가격은 3자리마다 콤마 붙여주었습니다.
        const ticketClassPrice =
          Number(tmpTicketClassPrice).toLocaleString("ko-KR");
        const ticketClassMaxMintCount = await showScheduleContract.methods
          .getTicketClassMaxMintCount(i)
          .call();
        tmp.push({
          ticketClassName,
          ticketClassPrice,
          ticketClassMaxMintCount,
        });
      }
      setTicketDetail(tmp);
      setShowDetail({
        ...showDetail,
        showId,
        stageName,
        ticketClassCount,
        maxMintCount,
        isCancelled,
        isResellAvailable: resellPolicy[0],
        resellRoyaltyRatePercent: resellPolicy[1],
        resellPriceLimit: resellPolicy[2],
        startedAt,
        endedAt,
      });
      const showInfo = await axios.get(
        `https://j6a102.p.ssafy.io/api/v1/show/${showId}`,
      );
      console.log("showInfo", showInfo);
      setShowDetailBack(showInfo.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 내 지갑 주소로 닉네임 가져오기
  const getUserNickname = async () => {
    try {
      const response = await axios.get(
        `https://j6a102.p.ssafy.io/api/v1/profile/nickname/${userData.account}`,
      );
      console.log("data.nickname", response.data.nickname);
    } catch (err) {
      console.error(err);
    }
  };

  // 공연 정보 백엔드에서 가져오기
  const getShowInfo = async () => {
    try {
      const showInfo = await axios.get(
        `https://j6a102.p.ssafy.io/api/v1/show/${showDetail.showId}`,
      );
      console.log("showInfo", showInfo);
      setShowDetailBack(showInfo.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callShowDetail();
  }, []);

  return (
    <div>
      <div>{showDetail.showId}</div>
      <div>{showDetailBack.poster_uri}</div>
      <TopCss>
        <TopLeftCss>
          <TopLeft
            showId={`${showDetail.showId}`}
            stageName={`${showDetail.stageName}`}
            startedAt={`${showDetail.startedAt}`}
            endedAt={`${showDetail.endedAt}`}
            allowedAge={`${showDetailBack.age_limit}`}
            showDuration={`${showDetailBack.running_time}`}
            showTitle={`${showDetailBack.name}`}
            catetory={`${showDetailBack.category_name}`}
            posterUri={`${showDetailBack.poster_uri}`}
            seatInfo={ticketDetail}
          ></TopLeft>
        </TopLeftCss>

        <TopRightCss>
          {scrollActive ? (
            <TopRightFixed>
              <TopRight></TopRight>
            </TopRightFixed>
          ) : (
            <TopRight></TopRight>
          )}
        </TopRightCss>
      </TopCss>

      <MiddleCss>
        <Middle description={`${showDetailBack.description}`}></Middle>
      </MiddleCss>

      <BottomCss>
        <Bottom></Bottom>
      </BottomCss>

      <Footer></Footer>
    </div>
  );
};

export default TicketDetail;
