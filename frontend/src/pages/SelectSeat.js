import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { web3, showScheduleAbi, myTicketContract, IERC20Contract } from "../utils/web3Config";

import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import swal from "sweetalert2";

import Seat from "../components/Purchase/Seat";
import SeatInfo from "../components/Purchase/SeatInfo";
import axios from "axios";

const ContainAll = styled.div`
  display: flex;
  justify-content: center;
`;

const WidthSettingDiv = styled.div`
  width: 1200px;
`;

const PageTitleDiv = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
  margin-top: 50px;
  margin-left: 25px;
`;

const ContainSeatAreaAndInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const ChooseSeatArea = styled.div`
  width: 800px;
`;

const SeatAndButtonArea = styled.div`
  margin-left: 40px;
  margin-top: 60px;
`;

const SeatInfoArea = styled.div`
  width: 300px;
  margin-left: 30px;
  border: 1px solid #dadee2;
  border-radius: 15px;
`;

const ButtonArea = styled.div`
  margin-left: 30px;
  margin-top: 10px;
`;

const BoldSpan = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

// 시간 단위 변경 (unixTime)
const unixTimeToDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dateString = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
  return dateString;
};

function SelectSeat({ getAccount }) {
  const navigate = useNavigate();
  // Detail에서 클릭해 받아온 공연 주소
  const { showScheduleAddress } = useParams(); // detail 페이지에서 넘겨 받아온 파라미터 = 공연 정보가 담긴 주소
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress); // showScheduleAddress를 통해서 공연 정보 받아오기

  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  // 티켓 발급을 위해 설정해야하는 showScheduleId
  const showScheduleId = localStorage.getItem(`${showScheduleAddress}`);

  // 주소에 맞는 공연 관련 정보
  const [showDetail, setShowDetail] = useState({});
  // 공연에 해당하는 티켓 정보
  const [ticketDetail, setTicketDetail] = useState([]);

  const [showDetailBack, setShowDetailBack] = useState({});

  // console.log('🦄', ticketDetail)

  // 티켓 발급을 위해 필요한 정보
  const [myTicket, setMyTicket] = useState({ showScheduleId }); // 좌석 등급, 공연 id
  const [register, setRegister] = useState({}); // 티켓 등록 정보
  const [occupied, setOccupied] = useState([]); // 좌석 판매 여부

  // 예약된 좌석은 1로 표시
  const [seatInfo, setSeatInfo] = useState([]);

  // 선택 완료된 좌석 정보
  const [seatData, setSeatData] = useState([]);

  // 좌석 선택 후 data 받아와서 seatData 값 변경해주는 함수
  const changeSeatData = (data) => {
    // console.log("selectSeat에서 선택된 좌석 정보", data); // data[0] : gradeId = classId, data[1] : id = seatIndex
    setSeatData((seatData) => data);
    setMyTicket({ ...myTicket, data });
  };

  const handleTicket = (e) => {
    setMyTicket({ ...myTicket, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  // 정보 저장
  // const saveInfo = () => {

  // }

  // contract 통해서 show detail 정보 가져오기
  const callShowDetail = async () => {
    try {
      const showId = await showScheduleContract.methods.getShowId().call();
      const stageName = await showScheduleContract.methods.getStageName().call();
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const resellPolicy = await showScheduleContract.methods.getResellPolicy().call();
      const maxMintCount = await showScheduleContract.methods.getMaxMintCount().call();
      const isCancelled = await showScheduleContract.methods.isCancelled().call();
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
        const occ = [];
        for (let j = 0; j < ticketClassMaxMintCount; j++) {
          const getTicketId = await showScheduleContract.methods.getTicketId(i, j).call();
          if (getTicketId > 0) {
            // console.log("🎃", getTicketId);
            occ.push([i, j]);
            setOccupied(occ);
          }
        }

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
      const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
      // console.log("showInfo", showInfo);
      setShowDetailBack(showInfo.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 좌석 예약 관련, 예약된 좌석 걸러내는 용도
  const test = async () => {
    try {
      const ticketClassCount = await showScheduleContract.methods.getTicketClassCount().call();
      const arr = [];
      for (let i = 0; i < ticketClassCount; i++) {
        const ticketClassMaxMintCount = await showScheduleContract.methods
          .getTicketClassMaxMintCount(i)
          .call();
        const tmp = [];
        for (let j = 0; j < ticketClassMaxMintCount; j++) {
          tmp.push(0);
          const getTicketId = await showScheduleContract.methods.getTicketId(i, j).call();
          if (getTicketId > 0) {
            tmp[j] = 1;
          }
        }
        const newItem = { grade: i, info: tmp };
        arr.push(newItem);
      }
      setSeatInfo(arr);
    } catch (err) {
      console.error(err);
    }
  };

  // swal
  const Toast = swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });

  // 티켓 등록
  const enrollTicket = async () => {
    try {
      // 0. 좌석은 골랐는지 확인
      if (seatData.length === 0) {
        swal.fire({
          icon: "error",
          title: "좌석을 골라주세요",
        });
        return;
      }

      // 0. 애초에 돈 있나 확인
      // const money = await IERC20Contract.methods.balanceOf(userData.account).call();
      // if (money < ticketDetail[myTicket.data[0]].ticketClassPrice) {
      //   // console.log("돈부족", ticketDetail[myTicket.data[0]].ticketClassPrice);
      //   swal.fire({
      //     icon: "error",
      //     title: "싸피 코인이 부족합니다.",
      //     html: `보유 코인 : ${money}<br>필요 코인 : ${
      //       ticketDetail[myTicket.data[0]].ticketClassPrice
      //     }`,
      //   });
      //   return;
      // }

      // 1. 티켓 발급
      console.log(
        "1",
        showDetailBack.poster_uri,
        parseInt(showScheduleId),
        parseInt(myTicket.data[0])
      );
      const createMyTicket = await myTicketContract.methods
        .create(showDetailBack.poster_uri, parseInt(showScheduleId), parseInt(myTicket.data[0]))
        .send({ from: userData.account });
      // ticketID 받아오기
      Toast.fire({
        icon: "success",
        title: `예매 Progress 1/3`,
      });
      // .then(function(){
      //   // 티켓 발급, 등록 완료되면 /MyPage로 이동
      //   navigate(`/Ticket/${ticketID}`);
      // })
      // console.log("Create", createMyTicket);
      const ticketID = createMyTicket.events.Transfer.returnValues.tokenId;

      // api 사용해서 백으로 일단 블록해시 넘겨주기 - 나중에 Ticket/:숫자 페이지에서 api로 받아와야 함 //
      const blockHash = createMyTicket.blockHash;
      const sendApi = await axios.post(`https://nfticket.plus/api/v1/block`, {
        ticket_id: ticketID,
        block_hash: blockHash,
      });
      // console.log("🐸")
      // console.log(ticketID, blockHash)
      // console.log(sendApi)
      setRegister({ ...register, ticketID });
      if (createMyTicket.status) {
        // 2. approve - 토큰 이동
        // console.log("2", showScheduleAddress);
        const approval = await IERC20Contract.methods
          .approve(showScheduleAddress, 500)
          .send({ from: userData.account });
        if (approval.status) {
          Toast.fire({
            icon: "success",
            title: `예매 Progress 2/3`,
          });
          // alert(`티켓 발급 완료`);
          // // 좌석 등록 여부 확인
          // const getTicketId = await showScheduleContract.methods
          //   .getTicketId(parseInt(myTicket.data[0]), parseInt(seatData[1])) // 좌석 등급과 좌석 번호로 좌석 빈 여부 확인
          //   .call();
          // if (getTicketId === 0) {
          // 아직 팔리지 않은 좌석이라면
          // 3. register
          // console.log(
          //   "3",
          //   parseInt(myTicket.data[0]),
          //   parseInt(seatData[2]),
          //   parseInt(ticketID),
          // );
          const registerTicket = await showScheduleContract.methods
            .registerTicket(parseInt(myTicket.data[0]), parseInt(seatData[2]), parseInt(ticketID))
            .send({ from: userData.account });

          if (registerTicket.status) {
            Toast.fire({
              icon: "success",
              title: `${ticketID}번 티켓 등록 성공`,
            }).then(function () {
              // 티켓 발급, 등록 완료되면 /MyPage로 이동
              navigate(`/Ticket/${ticketID}`);
            });
            // alert(`${ticketID}번 티켓 등록 성공`);
            // // 티켓 발급, 등록 완료되면 /Ticket/:ticketId로 이동
            // navigate(`/Ticket/${ticketID}`);
          }
          // } else {
          //   alert("이미 예약된 좌석입니다.");
          // }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callShowDetail();
    test();
  }, []);

  // console.log('seatInfo', seatInfo);  // 좌석 판매 완료 여부
  // console.log('showDetailBack', showDetailBack);
  // console.log('showDetail', showDetail);
  // console.log('register', register);
  // console.log('ticketDetail', ticketDetail);

  // console.log("myTicket", myTicket);

  return (
    <div>
      <ContainAll>
        <WidthSettingDiv>
          <div style={{ display: "flex", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
              <PageTitleDiv>
                티켓 구매 💳
                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "18px",
                    fontWeight: "400",
                    marginLeft: "2px",
                  }}
                >
                  원하는 좌석을 한 개 선택 후, 선택 완료 버튼을 눌러주세요.
                </p>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "18px",
                    fontWeight: "400",
                    marginLeft: "2px",
                  }}
                >
                  선택된 좌석 번호을 확인하시고 예매하기를 누르면 공연 예매가 완료됩니다 :)
                </p>
              </PageTitleDiv>
              <ChooseSeatArea>
                <Seat seatInfo={seatInfo} changeSeatData={changeSeatData}></Seat>
              </ChooseSeatArea>
            </div>

            <SeatAndButtonArea>
              <SeatInfoArea>
                <div style={{ margin: "30px" }}>
                  <SeatInfo showDetail={showDetail} showDetailBack={showDetailBack}></SeatInfo>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    티켓 발급
                  </p>
                  {/* <div>
                  ticketURI:
                  <input
                    type='text'
                    name='ticketURI'
                    value={showDetailBack.poster_uri}
                    onChange={handleTicket}
                    disabled={true}
                  />
                </div>
                <div>
                  showScheduleId:
                  <input
                    type='text'
                    name='showScheduleId'
                    value={myTicket.showScheduleId}
                    onChange={handleTicket}
                    disabled={true}
                  />
                </div>
                <div>
                  classId:
                  <input
                    type='number'
                    name='classId'
                    value={seatData[0]}
                    // value={myTicket.classId}
                    onChange={handleTicket}
                    // maxLength={ticketDetail.length}
                    // min="0"
                    // max={ticketDetail.length - 1}
                    disabled={true}
                  />
                </div> */}
                  {myTicket.data && (
                    <div>
                      <p
                        style={{
                          display: "flex",
                          fontSize: "16px",
                          fontWeight: "500",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        티켓 가격 :
                        <p
                          style={{
                            fontWeight: "600",
                            marginLeft: "4px",
                          }}
                        >
                          {ticketDetail[myTicket.data[0]].ticketClassPrice} SSF
                        </p>
                      </p>
                    </div>
                  )}
                  <div style={{ margin: "5px 0 0 0" }}>
                    <p
                      style={{
                        display: "flex",
                        fontSize: "16px",
                        fontWeight: "500",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      좌석 정보 :
                      <p
                        style={{
                          fontWeight: "600",
                          marginLeft: "4px",
                        }}
                      >
                        {seatData[1]}
                      </p>
                    </p>
                  </div>
                </div>
              </SeatInfoArea>
              <ButtonArea>
                <Stack spacing={1}>
                  <Button
                    onClick={enrollTicket}
                    sx={{
                      fontWeight: "bold",
                      color: "secondary.main",
                      borderColor: "text.secondary",
                      borderRadius: 3,
                      py: 1.5,
                    }}
                    variant="outlined"
                  >
                    예매하기
                  </Button>
                </Stack>
              </ButtonArea>
            </SeatAndButtonArea>
          </div>
        </WidthSettingDiv>
      </ContainAll>
    </div>
  );
}

export default SelectSeat;
