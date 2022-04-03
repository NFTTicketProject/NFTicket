import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

import Seat from "../components/Purchase/Seat";
import SeatInfo from "../components/Purchase/SeatInfo";

// import { web3, showScheduleAbi, myTicketContract, IERC20ABI } from "../utils/web3";
import {
  web3,
  showScheduleAbi,
  myTicketContract,
  IERC20ABI,
  IERC20Contract,
} from "../utils/web3Config";

styled.div`
  display: flex;
  justifycontent: center;
`;

const Purchase = () => {
  const [myTicket, SetMyTicket] = useState([]);

  // 이걸 사면 된다 (예시)
  const scheduleAddress = "0x084bcbACCC96c8026D25609431ec867Eeb035f78";
  const showScheduleContract = new web3.eth.Contract(showScheduleAbi, scheduleAddress);
  const myAddresss = "0x72e342D7E5dDfc7aF7b6c470EeACe96b3B6c5679";
  const SSAFYTokenAddr = "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333";

      // <div style={{ justifyContent: "center" }}>
      //   <h1>Purchase 페이지</h1>
        
      //   <SeatInfo></SeatInfo>
      //   <Seat></Seat>
  //티켓 등록
  const enrollTicket = async () => {
    try {
      const createMyTicket = await myTicketContract.methods
        .create(
          "https://gateway.pinata.cloud/ipfs/QmXMWiTGZRN2LBUWLqVgWimWFzsECXSjNM6TTwwpSnNYF5/1/1.json",
          1,
          0
        )
        .send({ from: myAddresss });
      console.log(createMyTicket);
      if (createMyTicket.status) {
        // approve
        const approval = await IERC20Contract.methods
          .approve(scheduleAddress, 500)
          .send({ from: myAddresss });
        if (approval.status) {
          const register = await showScheduleContract.methods
            .registerTicket(0, 2, 1)
            .send({ from: myAddresss });
          console.log(register);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 공연 발매 페이지에서 티켓 구매
  const registerTicket = async () => {
    // 티켓 구매용 SSAFY 코인 접근 권한 부여
    const ssaftTokenInstance = new web3.eth.Contract(IERC20ABI, SSAFYTokenAddr);
    await ssaftTokenInstance.methods.approve(scheduleAddress, 100).send({ from: myAddresss });

    // 티켓 판매자 SSAFY 코인 접근 권한 부여
    const ssaftTokenInstance2 = new web3.eth.Contract(IERC20ABI, SSAFYTokenAddr);
    await ssaftTokenInstance2.methods
      .approve(scheduleAddress, 100)
      .send({ from: "0xD823e14ed981f56Ca624D2d6FeE99Fa89af8Be31" });

    // 티켓을 발매한다.
    // parameter : (string memory ticketURI, uint256 showScheduleId, uint256 classId)
    // ticketURI : 티켓 정보가 담긴 json의 ipfs 위치 :
    // showScheduleId : 백에서의 해당 공연 아이디 :
    // classId : 좌석 등급을 번호로 변형(S->0)
    const response = await myTicketContract.methods
      .create(
        "https://gateway.pinata.cloud/ipfs/QmXMWiTGZRN2LBUWLqVgWimWFzsECXSjNM6TTwwpSnNYF5/1/1.json",
        1,
        0
      )
      .send({ from: myAddresss });
    console.log(response);
    // var ticktId = response.events.Transfer.id
    // var ticktId = response.events.Transfer.blockNumber
    var ticketId = response.events.Transfer.returnValues.tokenId;
    console.log("id", ticketId);
    // 발매한 티켓을 판다. 이때 조건이 맞는지 확인한다.
    // parameter : (uint256 classId, uint256 seatIndex, uint256 ticketId)
    // classId : 좌석 등급을 번호로 변형(S->0)
    // seatIndex : 등급당 번호
    // ticketId : 위에서 발매한 티켓 번호
    var res = await showScheduleContract.methods
      .registerTicket(0, 1, parseInt(ticketId))
      .send({ from: myAddresss });
    console.log(res);
  };

  // 내 티켓 전부 가져오기
  const refreshMyTicket = async () => {
    return;
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <h1>Purchase 페이지</h1>
      <div>구매할 공연 : {scheduleAddress}</div>
      <div>
        <button onClick={enrollTicket}>등록 테스트</button>
      </div>
      <Button variant="contained" onClick={registerTicket}>
        구매
      </Button>
      <Divider />
      <div>나의 티켓</div>
      <div>나의 주소 : {myAddresss}</div>
      <div>
        {myTicket.map((show) => (
          <div></div>
        ))}
      </div>

      {/* <Seat></Seat> */}
      {/* <SeatInfo></SeatInfo> */}
    </div>
  );
};

export default Purchase;
