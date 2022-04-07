import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import "./TicketDetail.css";

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
import Footer from "../components/Footer";

import PurchaseTicket from "../components/TicketDetail/PurchaseTicket";
import TicketImage from "../components/TicketDetail/TicketImage";
import TicketInfo from "../components/TicketDetail/TicketInfo";


const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString =
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

const TicketDetail = ({getAccount}) => {

  const navigate = useNavigate();

  const { ticketId } = useParams();

  // const { showScheduleAddress } = useParams();
  // const showScheduleContract = new web3.eth.Contract(
  //   showScheduleAbi,
  //   "0x4c6069672f42f21bAB6e13e60Df121aDF7DafD5E"
  // );
  // // const [showId, setShowId] = useState();
  const [showDetail, setShowDetail] = useState({});
  const [showDetailBack, setShowDetailBack] = useState({});
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const hallDescription =
    "경기도 남양주시 화도읍사무소 2층에서 진행합니다. 찾아오시는 길: 알아서 버스타고 오세요";

  const callShowDetail = async () => {
    try {
      const showScheduleId = await myTicketContract.methods.getShowScheduleId(ticketId).call();
      const classId = await myTicketContract.methods.getClassId(ticketId).call();

      const showScheduleAddress = await showScheduleManagerContract.methods
        .getShowSchedule(showScheduleId)
        .call();
      const showScheduleContract = new web3.eth.Contract(
        showScheduleAbi,
        showScheduleAddress,
      );
      const showId = await showScheduleContract.methods.getShowId().call();
      
      // 백에서 정보 가져오기
      const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
      console.log("🎃", showInfo);
      setShowDetailBack(showInfo.data);
      
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const isCancelled = await showScheduleContract.methods.isCancelled().call();
      // const isEnded = await ticketSaleContract.methods.isEnded().call();  // 티켓 판매 중인지 여부 확인 

      // 한길 추가, 공연시작과 끝 가져오기
      let startedAt = await showScheduleContract.methods.getStartedAt().call();
      let endedAt = await showScheduleContract.methods.getEndedAt().call();
      // 티켓 uri 정보
      const ticketImage = await myTicketContract.methods
        .getTokenURI(ticketId)
        .call();
      // 티켓 소유자
      const ownerOfTicket = await myTicketContract.methods.ownerOf(ticketId).call()
      // 티켓 번호 - 블록해시
      // const ticketContractNumber = "asdfbdlskfaf";
      const apiData = await (axios.get(`https://nfticket.plus/api/v1/block/${ticketId}`))
      const ticketContractNumber = apiData.data.block_hash
      // console.log("🐸", apiData)

      // Unix Timestamp를 Date로 바꾸기
      startedAt = unixTimeToDate(startedAt);
      endedAt = unixTimeToDate(endedAt);
      window.localStorage.setItem("isCancelled", isCancelled);
      // 티켓 좌석 정보저장
      const ticketClassName = await showScheduleContract.methods.getTicketClassName(classId).call();
      const ticketSeatIndex = await GetSeatIndex(ticketId);
      const ticketClassPrice = await showScheduleContract.methods.getTicketClassPrice(classId).call();
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
        ticketImage,
        ticketContractNumber,
        ticketClassName,
        ticketSeatIndex,
        ownerOfTicket,
        ticketClassPrice, ticketContractNumber
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
      console.log("getSale", getSale);
      setSaleAddr(getSale);
    } catch (err) {
      console.error(err);
    }
  };


  // 티켓ID 입력시 seatIndex 반환
  const GetSeatIndex = async (ticketIdToFind) => {
    // Contract 상에 등록된 공연 스케줄 개수를 가져옵니다
    const showScheduleCount = await showScheduleManagerContract.methods.getCount().call();
    // const showScheduleContracts = []
    let showSchedules = {}

    // 각 공연 스케줄의 정보를 가져옵니다
    for (var i = 1; i <= showScheduleCount; i++)
    {
        const ShowScheduleContractAddr = await showScheduleManagerContract.methods.getShowSchedule(i).call();
        const ShowScheduleContractInstance = new web3.eth.Contract(showScheduleAbi, ShowScheduleContractAddr);

        let showSchedule = {}
        showSchedule.address = ShowScheduleContractAddr;
        showSchedule.ticketClasses = []
        const ticketClassCount = await ShowScheduleContractInstance.methods.getTicketClassCount().call();
        for (var j = 0; j < ticketClassCount; j++)
        {
            var ticketClass = {
                name: await ShowScheduleContractInstance.methods.getTicketClassName(j).call(),
                price: await ShowScheduleContractInstance.methods.getTicketClassPrice(j).call(),
                maxMintCount: await ShowScheduleContractInstance.methods.getTicketClassMaxMintCount(j).call(),
            }

            showSchedule.ticketClasses.push(ticketClass)
        }
        showSchedules[i] = showSchedule
    }
  
    // const ticketIdToFind = 1 // Ticket ID 3번을 찾아보자
    let foundSeat = []
    for (var key of Object.keys(showSchedules))
    {
        const ShowScheduleContractAddr = showSchedules[key].address;
        const ShowScheduleContractInstance = new web3.eth.Contract(showScheduleAbi, ShowScheduleContractAddr);
        
        for (var [i, ticketClass] of showSchedules[key].ticketClasses.entries())
        {
            for (var j = 0; j < ticketClass.maxMintCount; j++)
            {
                const currentTicketId = await ShowScheduleContractInstance.methods.getTicketId(i, j).call()
                if (ticketIdToFind === currentTicketId) {foundSeat.push([i, j])}
            }
        }
    }
  
    // console.log('찾은 티켓 seatIndex', foundSeat[0][1])
    return foundSeat[0][1]
  }
  

  

  // 리셀링 추가 정보 불러오기
  const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
  const [ticketInfo, setTicketInfo] = useState({});
  const getTicketData = async () => {
    try {
      const ticketId = await ticketSaleContract.methods.getTicketId().call();
      const price = await ticketSaleContract.methods.getPrice().call(); // 리셀가격
      // const description = await ticketSaleContract.methods.getDescription().call(); // 상세 정보
      // const getStartedAt = await ticketSaleContract.methods.getStartedAt().call(); // 판매 시작시간
      const getEndedAt = await ticketSaleContract.methods.getEndedAt().call(); // 판매 종료시간
      const owner = await ticketSaleManagerContract.methods.owner().call();  // 판매자 정보
      // const owner = await myTicketContract.methods.ownerOf(ticketId).call()
      
      // const startTime = new Date(getStartedAt * 1000);
      // const endTime = new Date(getEndedAt * 1000);
      const ticketUri = await myTicketContract.methods
        .getTokenURI(ticketId)
        .call();

      setTicketInfo({
        ...ticketInfo,
        ticketId,
        ticketUri,
        price,
        // description,
        // getStartedAt,
        getEndedAt,
        owner,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // swal
  const Toast = swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
})

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
        Toast.fire({
            icon: 'success',
            title: `구매 Progress 1/2`
            })
        const purchase = await ticketSaleContract.methods
          .purchase()
          .send({ from: userData.account });
        if (purchase.status) {
          Toast.fire({
            icon: 'success',
            title: `구매 완료`
            }).then(function(){
              // 티켓 발급, 등록 완료되면 /MyPage로 이동
              navigate(`/MyPage`);
            })
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
    console.log("오ㅡ류")
    console.log(owner)
    console.log(userData.account)
    setIsSellable(owner.toLocaleLowerCase() === userData.account.toLocaleLowerCase());

  };


  const [isEnded, setIsEnded] = useState(false);  // 판매 완료가 되었는지 아닌지, 애초에 판매 완료라면 주소값이 0x000임.

  const getIsEnded = async () => {
    if (saleAddr === '0x0000000000000000000000000000000000000000') {  // 주소값이 없다면, 판매 완료 티켓
      setIsEnded(true);
    }
  };

  useEffect(() => {
    callShowDetail();
    getTicketAddr();
    checkOwner();
    getTicketData();
    getIsEnded();
  }, [saleAddr]);

  // useEffect(() => {
  //   callShowDetail();
  //   getTicketAddr();
  // }, []);


 console.log('showDetail', showDetail);
 console.log('showDetail', showDetail);
 console.log('ticketInfo', ticketInfo.owner);
 console.log('ticketUri', ticketInfo.ticketUri);


//  console.log('🐸', showDetail);
//  console.log('showDetail', showDetail);
//  console.log('ticketInfo', ticketInfo);

const [toggle, setToggle] = useState(false);
  const isOnSale = () => {
    const now = new Date().getTime();
    if (ticketInfo.getEndedAt * 1000 > now) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }
   useEffect(() => {
    isOnSale()
  }, []);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div
        className='ticket-image'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
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
          posterUri={`${showDetail.ticketImage}`}
          ticketId={ticketId}  // 티켓 id
          ticketClassName={showDetail.ticketClassName}
          ticketSeatIndex={showDetail.ticketSeatIndex}  // [0] : 클래스Id, [1] : seatIndex
          price={showDetail.ticketClassPrice}
          saleAddr={saleAddr}  // 티켓 주소
          isSellable={isSellable}
          ticketUri={`${ticketInfo.ticketUri}`}
          ticketContractNumber={`${showDetail.ticketContractNumber}`}
        >
        </TicketImage>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItem: "start",
        }}
      >
        <TicketInfo
          showTitle={`${showDetailBack.name}`}  // 제목
          owner={`${showDetail.ownerOfTicket}`}
          // owner={`${ticketInfo.owner}`}  // 소유자
          ticketId={ticketId}  // 티켓 id
          saleAddr={saleAddr}  // 티켓 주소
          description={`${showDetailBack.description}`}
          hallDescription={`${hallDescription}`}
          ticketContractNumber = {showDetail.ticketContractNumber}
        ></TicketInfo>
        <PurchaseTicket
          getAccount={getAccount}
           saleAddr={saleAddr}
          showTitle={`${showDetailBack.name}`}  // 제목
          casting={`${showDetailBack.staffs}`}
          price={ticketInfo.price}
          ticketId={ticketId}
          isSellable={isSellable}  // 판매자인지 아닌지
          isEnded={isEnded}  // 티켓 판매 중 여부
          ticketSeatIndex={showDetail.ticketSeatIndex}
          buyTicket={buyTicket}
          endedAt={ticketInfo.getEndedAt}
          endAt={`${showDetail.endedAt}`}
          ticketClassName={showDetail.ticketClassName}
          ></PurchaseTicket>

      </div>
      

      <Footer></Footer>
    </div>
  );
};

export default TicketDetail;
