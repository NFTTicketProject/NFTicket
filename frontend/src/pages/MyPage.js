import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { saveAccount } from "../store/WalletReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import TicketCollection from "../components/TicketCollection";
import { myTicketContract } from "../utils/web3Config";
import TicketOnSale from "../components/MyPage/TicketOnSale";
import MyTicket from "../components/MyPage/MyTicket";
// import { myTicketContract } from "../utils/web3";

const UnconnectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const LogInButton = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: rgba(229, 229, 229, 0.8);
  }
`;

const UserInfo = styled.div`
  border: none;
`;
//
const NavList = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #939393;
`;

const NavListItem = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
`;

const NavListItemSelected = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  font-weight: bold;
`;
const TitleText = styled.h2`
  margin-left: 20px;
`;

const DescriptionDiv = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`;

function MyPage() {
  const [pageNum, setPageNum] = useState(1);
  const handlePageNum = (page) => {
    setPageNum(page);
  };
  //
  const [userInfo, setUserInfo] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState({
    nickname: "Unnamed",
    description: "Please Write Description",
  });

  // Redux
  const dispatch = useDispatch();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      // ethereum 관련 아닐 때
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      // metamask가 깔려있지 않을 때 -> 메타마스크 설치 페이지로 이동
    } else {
      alert("Install Metamask!");
      window.location =
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/";
    }
    return provider;
  };

  // 로그인 버튼 클릭, 계정 정보 가져오기 (+ 로컬 스토리지에 정보 저장)
  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);

        // 계정 정보 가져오기 - 계정 주소, 체인아이디, 잔액
        const userAccount = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId(); // ChainId
        const account = userAccount[0]; // 지갑 주소
        dispatch(saveAccount(account)); // Redux 추가
        let ethBalance = await web3.eth.getBalance(account); // 잔액
        ethBalance = web3.utils.fromWei(ethBalance, "ether"); //wei로 변환

        // userInfo에 저장 (localStorage)
        saveUserInfo(ethBalance, account, chainId);

        // post
        axios
          .post(`https://nfticket.plus/api/v1/account/${account}`)
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              checkConnectedWallet();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(walletInfo);
  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData);
    setIsConnected(true);
  };
  // 로그아웃
  const onDisconnect = () => {
    window.localStorage.removeItem("userAccount");
    setUserInfo({});
    setIsConnected(false);
    setWalletInfo([]);
  };

  function checkConnectedWallet() {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    if (userData != null) {
      setUserInfo(userData);
      setIsConnected(true);
      // api 통해 지갑 정보 가져오고, walletInfo에 정보 추가
      // .get
      axios
        .get(`https://nfticket.plus/api/v1/profile/${userData.account}`)
        .then((res) => {
          setWalletInfo(res.data);
          console.log(res);
        })
        .catch((err) => console.error(err));
    }
  }

  // useEffect(() => {
  //   console.log(walletInfo);
  // }, []);

  ////
  const [ticketArray, setTicketArray] = useState([]);
  const [saleStatus, setSaleStatus] = useState(false);
  // const account = userInfo.account;
  // console.log(account);

  const getMyTickets = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      // 해당 지갑 주소 소유자가 가지고있는 티켓 수
      const balanceLength = await myTicketContract.methods.balanceOf(userData.account).call();

      const tempArray = [];
      for (let i = 0; i < parseInt(balanceLength, 10); i++) {
        // ticketId: 1부터 시작
        const ticketId = await myTicketContract.methods
          .tokenOfOwnerByIndex(userData.account, i)
          .call();
        // showScheduleId: 1부터 시작
        const showScheduleId = await myTicketContract.methods.getShowScheduleId(ticketId).call();
        // clasId: 1부터 시작
        const classId = await myTicketContract.methods.getClassId(ticketId).call();
        //
        const ticketUri = await myTicketContract.methods.getTokenURI(ticketId).call();
        tempArray.push({ ticketId, showScheduleId, classId, ticketUri });
      }
      setTicketArray(tempArray);
    } catch (err) {
      console.error(err);
    }
  };

  // const getIsApprovedForAll = async () => {
  //   try {
  //      const userData = JSON.parse(localStorage.getItem("userAccount"));
  //     const response = await myTicketContract.methods
  //       .isApprovedForAll(userData.account, saleAnimalTokenAddress)
  //       .call();

  //     // console.log(response);
  //     if (response.status) {
  //       setSaleStatus(response);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    checkConnectedWallet();
  }, []);

  useEffect(() => {
    getMyTickets();
    console.log(ticketArray);
  }, [walletInfo.nickname]);

  return (
    <>
      {isConnected ? (
        <>
          <ConnectedContainer>
            {/* 배경 */}
            <img
              src="images/1614121632-NYAN-CAT.jpeg"
              alt=""
              style={{
                height: "300px",
                width: "100%",
                objectFit: "cover",
              }}
            />
            {/* 프로필 사진 */}
            <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
              <Grid item xs={4}>
                <div></div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "390px",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {walletInfo.image_uri !== null ? (
                    <img
                      src={walletInfo.image_uri}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src="images/MetaMask_Fox.svg.png"
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover",
                        background: "grey",
                      }}
                    />
                  )}
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  paddingRight: "4rem",
                }}
              >
                <Link to="/MyPage/Settings">
                  <SettingsIcon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </Link>

                <LogoutIcon
                  onClick={onDisconnect}
                  style={{ color: "black", height: "30px", width: "30px", marginLeft: "0.5rem" }}
                />
              </Grid>
            </Grid>
            {/* 유저 정보 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              {/* 닉네임 */}
              <UserInfo>
                <h1>{walletInfo.nickname}</h1>
              </UserInfo>
              {/* 지갑 주소 */}
              <p
                style={{
                  width: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  border: "1px solid grey",
                  borderRadius: "20px",
                  padding: "0.5rem",
                }}
              >
                <img
                  src="images/ethereum.png"
                  alt="eth"
                  style={{ width: "20px", height: "20px" }}
                />
                {userInfo.account}
              </p>
              {/* 설명 */}
              <UserInfo>
                <p>{walletInfo.description}</p>
              </UserInfo>
            </div>
            {/* <div>
              <Button onClick={onDisconnect}>로그아웃</Button>
            </div> */}
          </ConnectedContainer>

          <div>
            <NavList>
              {pageNum === 1 ? (
                <NavListItemSelected onClick={() => handlePageNum(1)}>
                  나의 티켓
                </NavListItemSelected>
              ) : (
                <NavListItem onClick={() => handlePageNum(1)}>나의 티켓</NavListItem>
              )}
              {pageNum === 2 ? (
                <NavListItemSelected onClick={() => handlePageNum(2)}>
                  판매중인 티켓
                </NavListItemSelected>
              ) : (
                <NavListItem onClick={() => handlePageNum(2)}>판매중인 티켓</NavListItem>
              )}
            </NavList>

            {pageNum === 1 && (
              <div>
                <TitleText>나의 티켓</TitleText>
                <DescriptionDiv>
                  {ticketArray &&
                    ticketArray.map((v, i) => {
                      return <MyTicket key={i} {...v} />;
                    })}
                </DescriptionDiv>
              </div>
            )}
            {pageNum === 2 && (
              <div>
                <TitleText>판매중인 티켓</TitleText>
                <DescriptionDiv>
                  {/* {ticketArray &&
                    ticketArray.map((v, i) => {
                      return <TicketOnSale key={i} {...v} />;
                    })} */}
                  <TicketOnSale />
                </DescriptionDiv>
              </div>
            )}
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}
          >
            <TicketCollection />
            <TicketCollection />
          </div> */}
        </>
      ) : (
        <UnconnectedContainer>
          <h1>Connect Your Wallet</h1>
          <LogInButton variant="contained" onClick={onConnect}>
            <img
              src="images/MetaMask_Fox.svg.png"
              alt="foxie"
              style={{ width: "50px", height: "50px" }}
            />
            Metamask
          </LogInButton>
        </UnconnectedContainer>
      )}
    </>
  );
}

export default MyPage;
