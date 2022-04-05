import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import './TicketDetail.css'

import {
  web3,
  showScheduleAbi,
  myTicketContract,
  showScheduleManagerContract,
  ticketSaleManagerContract,
  IERC20Contract,
  ticketSaleAbi,
} from "../utils/web3Config";

import axios from "axios";
import styled from "styled-components";

import TopLeft from "../components/TicketDetail/TopLeft";
import TopRight from "../components/TicketDetail/TopRight";
import Middle from "../components/TicketDetail/Middle";
import Bottom from "../components/TicketDetail/Bottom";
import Footer from "../components/Footer";

import PurchaseTicket from "../components/TicketDetail/PurchaseTicket";
import TicketImage from "../components/TicketDetail/TicketImage";
import TicketInfo from "../components/TicketDetail/TicketInfo";


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
  top: 190px;
  position: fixed;
  margin-left: 50px;
`;

const MiddleCss = styled.div`
  width: 1200px;
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
  const dateString = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

const TicketDetail = () => {
  // 스크롤 고정시키기 위한 변수들
  // 원래 어느 부분 내려가면 scrollActive가 false나 true로 변하면서 딱 걸쳐지게 만들려고 했는데 잘 안되네요 기각해도 될듯하
  // const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  
  // console.log(walletInfo);


  // const [scrollActive, setScrollActive] = useState(true);

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

  const { ticketId } = useParams();

  // const { showScheduleAddress } = useParams();
  // const showScheduleContract = new web3.eth.Contract(
  //   showScheduleAbi,
  //   "0x4c6069672f42f21bAB6e13e60Df121aDF7DafD5E"
  // );
  // // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [ticketDetail, setTicketDetail] = useState([]);
  const [showDetailBack, setShowDetailBack] = useState({});
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const hallDescription =
    "경기도 남양주시 화도읍사무소 2층에서 진행합니다. 찾아오시는 길: 알아서 버스타고 오세요";

  const callShowDetail = async () => {
    try {
      const showScheduleId = await myTicketContract.methods.getShowScheduleId(ticketId).call();
      const showScheduleAddress = await showScheduleManagerContract.methods
        .getShowSchedule(showScheduleId)
        .call();
      const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
      const showId = await showScheduleContract.methods.getShowId().call();
      // 백에서 정보 가져오기
      const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
      console.log("showInfo", showInfo);
      setShowDetailBack(showInfo.data);
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const isCancelled = await showScheduleContract.methods.isCancelled().call();
      const isEnded = await ticketSaleContract.methods.isEnded().call();  // 티켓 판매 중인지 여부 확인 
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
        const ticketClassName = await showScheduleContract.methods.getTicketClassName(i).call();
        const tmpTicketClassPrice = await showScheduleContract.methods
          .getTicketClassPrice(i)
          .call();
        // 가격은 3자리마다 콤마 붙여주었습니다.
        const ticketClassPrice = Number(tmpTicketClassPrice).toLocaleString("ko-KR");
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
        isEnded,  // 판매 여부
      });
      // const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showDetail.showId}`);
      // console.log("showInfo", showInfo);
      // setShowDetailBack(showInfo.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 티켓 주소 받아오기
  const [saleAddr, setSaleAddr] = useState();
  const getTicketAddr = async () => {
    try {
      const getSale = await ticketSaleManagerContract.methods
        .getSaleOfTicket(parseInt(ticketId))
        .call();
      console.log('getSale', getSale);
      setSaleAddr(getSale);
    
    } catch (err) {
      console.error(err);
    }
  };

  

  // // 내 지갑 주소로 닉네임 가져오기
  // const getUserNickname = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nfticket.plus/api/v1/profile/nickname/${userData.account}`
  //     );
  //     console.log("data.nickname", response.data.nickname);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // 내 지갑 주소로 닉네임 가져오기
  // const getUserNickname = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nfticket.plus/api/v1/profile/nickname/${userData.account}`
  //     );
  //     console.log("data.nickname", response.data.nickname);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // 공연 정보 백엔드에서 가져오기
  // const getShowInfo = async () => {
  //   try {
  //     const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showDetail.showId}`);
  //     console.log("showInfo", showInfo);
  //     setShowDetailBack(showInfo.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  

  

  // 리셀링 추가 정보 불러오기
  const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
  const [ticketInfo, setTicketInfo] = useState({});
  const getTicketData = async () => {
    try {
      const ticketId = await ticketSaleContract.methods.getTicketId().call();
      const price = await ticketSaleContract.methods.getPrice().call(); // 리셀가격
      // const description = await ticketSaleContract.methods.getDescription().call(); // 상세 정보
      // const getStartedAt = await ticketSaleContract.methods.getStartedAt().call(); // 판매 시작시간
      // const getEndedAt = await ticketSaleContract.methods.getEndedAt().call(); // 판매 종료시간
      const owner = await ticketSaleManagerContract.methods.owner().call();  // 판매자 정보
      // const startTime = new Date(getStartedAt * 1000);
      // const endTime = new Date(getEndedAt * 1000);
      const ticketUri = await myTicketContract.methods.getTokenURI(ticketId).call();

      setTicketInfo({
        ...ticketInfo,
        ticketId,
        ticketUri,
        price,
        // description,
        // getStartedAt,
        // getEndedAt,
        owner,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // // 리셀링 정보 받아오기 market 페이지 참조
  // const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);

  // const getTicketOnSale = async () => {
  //   try {
  //     const cnt = await myTicketContract.methods.totalSupply().call();
  //     console.log(cnt);
  //     const ticketInfos = [];
  //     for (let i = 1; i < parseInt(cnt) + 1; i++) {
  //       const saleAddr = await ticketSaleManagerContract.methods.getSaleOfTicket(i).call();
  //       if (saleAddr != "0x0000000000000000000000000000000000000000") {
  //         const showScheduleId = await myTicketContract.methods.getShowScheduleId(i).call();
  //         const showScheduleAddress = await showScheduleManagerContract.methods
  //           .getShowSchedule(showScheduleId)
  //           .call();
  //         const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
  //         const showId = await showScheduleContract.methods.getShowId().call();
  //         // 공연 발매자
  //         const stageSeller = await showScheduleManagerContract.methods.ownerOf(showId).call();
  //         var stageSellerName = await getUserNickname(stageSeller);
  //         // 티켓 소유자
  //         const ticketSeller = await ticketSaleManagerContract.methods.ownerOf(i).call();
  //         var ticketSellerName = await getUserNickname(ticketSeller);
  //         const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
  //         const ticketUri = await myTicketContract.methods.getTokenURI(i).call();
  //         const categoryName = showInfo.data.category_name;
  //         const price = await ticketSaleContract.methods.getPrice().call();
  //         const startAt = await ticketSaleContract.methods.getStartedAt().call();
  //         var dateStart = new Date(startAt * 1000);
  //         var dateStartString =
  //           dateStart.getFullYear() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getDate();
  //         const endAt = await ticketSaleContract.methods.getEndedAt().call();
  //         var dateEnd = new Date(endAt * 1000);
  //         var dateEndString =
  //           dateEnd.getFullYear() + "." + (dateEnd.getMonth() + 1) + "." + dateEnd.getDate();

          
  //         ticketInfos.push({
  //           ticketId: i,
  //           saleAddr,
  //           showId,
  //           stageSellerName,
  //           ticketSellerName,
  //           ticketUri,
  //           name: showInfo.data.name,
  //           price,
  //           dateStartString,
  //           dateEndString,
  //         });
  //       }
  //     }
  //     setSaleTicketArray(ticketInfos);
  //     setSaleTicketSearchArray(ticketInfos);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  // // 초기정보
  // useEffect(() => {
  //   getTicketOnSale();
  // }, []);

  // const getUserNickname = async (wallet) => {
  //   try {
  //     const response = await axios.get(`https://nfticket.plus/api/v1/profile/nickname/${wallet}`);
  //     return response.data.nickname;
  //   } catch (err) {
  //     return "NFTicket";
  //   }
  // };

  const buyTicket = async () => {
    try {
      // // 유효성 체크 setapprovalforall(ticketSaleManagerAddress, true)
      // const val = await myTicketContract.methods
      //   .setApprovalForAll(saleAddr, true)
      //   .send({ from: userData.account });
      // 1. gatSale()통해 contract 주소
      // 2. approve
      const approval = await IERC20Contract.methods
        .approve(saleAddr, 500)
        .send({ from: userData.account });
      console.log(approval);
      // 3. ticketSale.sol 발행
      if (approval.status) {
        const purchase = await ticketSaleContract.methods
          .purchase()
          .send({ from: userData.account });
        if (purchase.status) {
          alert("구매 완료");
          navigate("/MyPage");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isSellable, setIsSellable] = useState(false);

  const checkOwner = async () => {
    // 티켓 소유자인지 확인 - 소유자만 판매 가능
    const owner = await myTicketContract.methods.ownerOf(parseInt(ticketId)).call();
    setIsSellable(owner.toLocaleLowerCase() === userData.account.toLocaleLowerCase());
  };

  useEffect(() => {
    callShowDetail();
    getTicketAddr();
    checkOwner();
    getTicketData();
  }, [saleAddr]);

 console.log('ticketInfo', ticketInfo);
 console.log('ticketInfo', ticketInfo.owner);
 console.log('ticketUri', ticketInfo.ticketUri);


//  console.log('showDetail', showDetail);
//  console.log('ticketDetail', ticketDetail);
//  console.log('showDetailBack', showDetailBack);
//  console.log('ticketInfo', ticketInfo);
 

  return (
    <div>
      <div className="ticket-image" style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
        <TicketImage
          showId={`${showDetail.showId}`}
          stageName={`${showDetail.stageName}`}
          startedAt={`${showDetail.startedAt}`}
          endedAt={`${showDetail.endedAt}`}
          allowedAge={`${showDetailBack.age_limit}`}
          showDuration={`${showDetailBack.running_time}`}
          showTitle={`${showDetailBack.name}`}
          catetory={`${showDetailBack.category_name}`}
          casting={`${showDetailBack.staffs}`}
          posterUri={`${showDetailBack.poster_uri}`}
          seatInfo={ticketDetail}
          ticketId={`${ticketInfo.ticketId}`}  // 티켓 id
          price={ticketInfo.price}
          saleAddr={saleAddr}  // 티켓 주소
          isSellable={isSellable}
          ticketUri={`${ticketInfo.ticketUri}`}
        >
        </TicketImage>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'start'}}>
        <TicketInfo
          showTitle={`${showDetailBack.name}`}  // 제목
          owner={`${ticketInfo.owner}`}  // 소유자
          ticketId={`${ticketInfo.ticketId}`}  // 티켓 id
          saleAddr={saleAddr}  // 티켓 주소
          description={`${showDetailBack.description}`}
          hallDescription={`${hallDescription}`}
        ></TicketInfo>
        <PurchaseTicket
          showTitle={`${showDetailBack.name}`}  // 제목
          seatInfo={ticketDetail}
          casting={`${showDetailBack.staffs}`}
          price={ticketInfo.price}
          ticketId={ticketId}
          isSellable={isSellable}
          isEnded={`${showDetail.isEnded}`}  // 티켓 판매 중 여부
          buyTicket={buyTicket}
          ></PurchaseTicket>
      </div>
      {/* <TopCss>
        
        <TopRightCss>
          {scrollActive ? (
            <TopRightFixed>
              <TopRight
                seatInfo={ticketDetail}
                casting={`${showDetailBack.staffs}`}
                ticketId={ticketId}
                buyTicket={buyTicket}
              ></TopRight>
            </TopRightFixed>
          ) : (
            <TopRight
              seatInfo={ticketDetail}
              casting={`${showDetailBack.staffs}`}
              ticketId={ticketId}
            ></TopRight>
          )}
        </TopRightCss>
      </TopCss>

      <MiddleCss>
        <Middle
          description={`${showDetailBack.description}`}
          casting={`${showDetailBack.staffs}`}
          hallDescription={`${hallDescription}`}
        ></Middle>
      </MiddleCss>

      <BottomCss>
        <Bottom></Bottom>
      </BottomCss> */}

      <Footer></Footer>
    </div>
  );
};

export default TicketDetail;
