import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { changeAccount } from "../store/WalletReducer";
import { myTicketContract } from "../utils/web3Config";

function Profile() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [walletInfo, setWalletInfo] = useState([]);
  let accounts;

  // 1. 지갑과 연결
  // 2. api 연결(post)
  const connectWallet = async () => {
    try {
      // metamask가 설치되어있으면 아래 코드 실행
      if (window.ethereum) {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // account에 지갑 주소 넣어주기
        setAccount(accounts[0]);
      } else {
        // metamask가 설치되어있지 않은 경우 alert
        alert("Install Metamask!");
      }
    } catch (err) {
      console.error(err);
    }

    axios
      .post(`https://j6a102.p.ssafy.io/api/v1/account/${accounts[0]}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // api 통해 지갑 정보 가져오고, walletInfo에 정보 추가
  const getWalletInfo = () => {
    axios
      .get(`https://j6a102.p.ssafy.io/api/v1/profile/${account}`)
      .then((res) => {
        console.log(res.data);
        setWalletInfo(res.data);
      })
      .catch((err) => console.error(err));
  };
  // console.log(walletInfo);

  // 민트 관련 함수
  const handleTest = async () => {
    const ticketURI = "ipfs:"; // 메타데이터 IPFS주소
    const showScheduleId = 2; // 솔리디티에서 발행된 공연스케줄 ID - 나중
    const classId = 3; // 백엔드에서 발행된 등급 ID - 나중
    const issuePrice = 100; // 발행 가격
    const isResellAvailable = false; // 리셀가능여부 T/F
    const resellRoyaltyRatePercent = 5; // 0~100
    const resellPriceLimit = 6; // SSF단위 최대 가격
    try {
      const response = await myTicketContract.methods
        .create(
          account,
          ticketURI,
          showScheduleId,
          classId,
          issuePrice,
          isResellAvailable,
          resellRoyaltyRatePercent,
          resellPriceLimit
        )
        .send({ from: account });
      console.log(response);

      if (response.status) {
        const tokenId = response.events.Transfer.returnValues.tokenId;
        console.log(`발행한 tokenId: ${tokenId}`);
        const balanceLength = await myTicketContract.methods.balanceOf(account).call();
        console.log(`해당 주소가 보유하고있는 NFT 토큰의 개수: ${balanceLength}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 일단 지금당장은 필요 없는데 나중에 수정 관련 구현할 때 사용하면 되니까...
  const handleWalletInfoChange = (e) => {
    setWalletInfo({ ...walletInfo, [e.target.name]: e.target.value });
  };

  // 아직 수정 관련 내용은 구현이 안된거라 패스
  // const editWalletInfo = () => {
  //   axios
  //     .post(`https://j6a102.p.ssafy.io/api/v1/account/${account}`, { walletInfo })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <>
      <h1>Profile</h1>
      {account ? (
        <div>
          Hello {account}
          <div>
            <button onClick={getWalletInfo}>정보 가져오기</button>
          </div>
          <form>
            <input
              type="text"
              name="nickname"
              value={walletInfo.nickname}
              onChange={handleWalletInfoChange}
              placeholder="Nickname"
            />
            <input
              type="text"
              name="description"
              value={walletInfo.description}
              onChange={handleWalletInfoChange}
              placeholder="Description"
            />
            {/* <button onClick={editWalletInfo}>수정</button> */}
          </form>
          <div>
            <button onClick={handleTest}>Mint</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>로그인</button>
        </div>
      )}
      <hr />
      <pre>
        로그인에는 Metamask가 필요하고 Metamask의 최상위 계정을 가져옵니다.<br/>
        <br/>
        그 이후, 정보 가져오기를 누르시면 해당 지갑주소에 연동된 닉네임과 description을 가져올 수 있습니다.<br/>
        대상 ticket이 detail에서 발급 된 경우, 최근 발급된 티켓을 현재 주소 소유자의 이름으로 Mint할 수 있습니다.  <br/>
        console.log에 발급된 티켓의 해쉬블록과 그 계정의 현재 NFT 갯수 등의 정보를 확인할 수 있습니다.  <br/>
      </pre>
    </>
  );
}

export default Profile;
