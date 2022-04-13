import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import MyTicketItem from "../components/MyPage/MyTicketItem";
import Tmp from "../components/MyPage/Tmp";
import MyShow from "../components/MyPage/MyShow";
import {
  myTicketContract,
  showScheduleAbi,
  showScheduleManagerContract,
  ticketSaleManagerContract,
  web3,
} from "../utils/web3Config";

const UnconnectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin-top: 5rem;
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
  border-radius: 7px;
  border: 1px solid #e5e5e5;
  padding: 1.5rem 3rem;
  margin-top: 1rem;
  box-sizing: border-box;
  font-size: 22px;
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
  margin-top: 1rem;
`;
//
const NavList = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
  border-bottom: 0.5px solid #ababab80;
`;

const NavListItem = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  font-size: 18px;
  cursor: pointer;
`;

const NavListItemSelected = styled.div`
  margin: 12px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
`;
const TitleText = styled.h2`
  margin-left: 20px;
`;

const DescriptionDiv = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`;

function MyPage() {
  const [account, setAccount] = useState("");
  const getAccount = async () => {
    try {
      // metamask가 설치되어있으면 아래 코드 실행
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        // metamask가 설치되어있지 않은 경우 alert
        alert("Install Metamask!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onC = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        saveU(accounts[0]);
        const res = await axios.post(`https://nfticket.plus/api/v1/account/${accounts[0]}`);
        if (res.status) {
          checkConnectedWallet();
        }
      } else {
        // metamask가 설치되어있지 않은 경우 alert
        alert("Install Metamask!");
      }
    } catch (err) {
      console.error(err);
    }
    window.location.reload(false);
  };

  const saveU = (account) => {
    const userAccount = {
      account: account,
    };
    window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData);
    setIsConnected(true);
  };

  ////
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userAccount"));
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
  ////
  const [ticketArray, setTicketArray] = useState([]);
  const [myTicketArray, setMyTicketArray] = useState([]);
  const [saleStatus, setSaleStatus] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // const detectCurrentProvider = () => {
  //   let provider;
  //   if (window.ethereum) {
  //     provider = window.ethereum;
  //     // ethereum 관련 아닐 때
  //   } else if (window.web3) {
  //     provider = window.web3.currentProvider;
  //     // metamask가 깔려있지 않을 때 -> 메타마스크 설치 페이지로 이동
  //   } else {
  //     alert("Install Metamask!");
  //     window.location =
  //       "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/";
  //   }
  //   return provider;
  // };

  // // 로그인 버튼 클릭, 계정 정보 가져오기 (+ 로컬 스토리지에 정보 저장)
  // const onConnect = async () => {
  //   try {
  //     const currentProvider = detectCurrentProvider();
  //     if (currentProvider) {
  //       await currentProvider.request({ method: "eth_requestAccounts" });
  //       const web3 = new Web3(currentProvider);

  //       // 계정 정보 가져오기 - 계정 주소, 체인아이디, 잔액
  //       const userAccount = await web3.eth.getAccounts();
  //       const chainId = await web3.eth.getChainId(); // ChainId
  //       const account = userAccount[0]; // 지갑 주소
  //       dispatch(saveAccount(account)); // Redux 추가
  //       let ethBalance = await web3.eth.getBalance(account); // 잔액
  //       ethBalance = web3.utils.fromWei(ethBalance, "ether"); //wei로 변환

  //       // userInfo에 저장 (localStorage)
  //       saveUserInfo(ethBalance, account, chainId);

  //       // post
  //       axios
  //         .post(`https://nfticket.plus/api/v1/account/${account}`)
  //         .then((res) => {
  //           // console.log(res);
  //           if (res.status === 200) {
  //             checkConnectedWallet();
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   window.location.reload(false);
  // };

  // const saveUserInfo = (ethBalance, account, chainId) => {
  //   const userAccount = {
  //     account: account,
  //     balance: ethBalance,
  //     connectionid: chainId,
  //   };
  //   window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
  //   // const userData = JSON.parse(localStorage.getItem("userAccount"));
  //   setUserInfo(userData);
  //   setIsConnected(true);
  // };
  // 로그아웃
  const onDisconnect = () => {
    window.localStorage.removeItem("userAccount");
    setUserInfo({});
    setIsConnected(false);
    setWalletInfo([]);
    window.location.reload(false);
  };

  function checkConnectedWallet() {
    // const userData = JSON.parse(localStorage.getItem("userAccount"));
    if (userData != null) {
      setUserInfo(userData);
      setIsConnected(true);
      // api 통해 지갑 정보 가져오고, walletInfo에 정보 추가
      // .get
      axios
        .get(`https://nfticket.plus/api/v1/profile/${userData.account}`)
        .then((res) => {
          setWalletInfo(res.data);
          // console.log(res);
        })
        .catch((err) => console.error(err));
    }
  }

  // 나의 티켓
  const getMyTickets = async () => {
    try {
      // const userData = JSON.parse(localStorage.getItem("userAccount"));
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
        // clasId: 1부터 시작 => className(좌석 등급으로 변환)
        const classId = await myTicketContract.methods.getClassId(ticketId).call();
        const showScheduleAddress = await showScheduleManagerContract.methods
          .getShowSchedule(showScheduleId)
          .call();
        const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
        const className = await showScheduleContract.methods.getTicketClassName(classId).call();
        // 공연 이름 ??????????????????
        const showId = await showScheduleContract.methods.getShowId().call();
        const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
        // 티켓 이미지 주소
        const ticketUri = await myTicketContract.methods.getTokenURI(ticketId).call();

        tempArray.push({
          ticketId,
          showScheduleId,
          ticketUri,
          className,
          name: showInfo.data.name,
        });
      }
      setTicketArray(tempArray);
    } catch (err) {
      console.error(err);
    }
  };

  // 판매 티켓
  const getMyTicketsOnSale = async () => {
    try {
      const cnt = await ticketSaleManagerContract.methods
        .getSaleIdsByWallet(userData.account)
        .call();

      const tempAddress = [];
      for (let i = 0; i < parseInt(cnt.length); i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSale(parseInt(cnt[i])).call();
        tempAddress.push({ saleAddr });
      }
      setMyTicketArray(tempAddress);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkConnectedWallet();
    getMyTicketsOnSale();
    getMyShows();
    getMyTickets();
  }, []);

  useEffect(() => {
    getMyTicketsOnSale();
    getMyShows();
    getMyTickets();
  }, [pageNum]);

  // 로열티 회수
  const wtRoyalty = async () => {
    try {
      const withdrawR = await ticketSaleManagerContract.methods
        .withdrawRoyalty()
        .send({ from: userData.account });
      if (withdrawR.status) {
        alert("SSF 회수가 완료되었습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showArray, setShowArray] = useState([]);
  // show
  const getMyShows = async () => {
    try {
      const myShowSchedules = await showScheduleManagerContract.methods
        .getShowSchedulesOfOwner(userData.account)
        .call();
      const tmp = [];
      for (let i = 0; i < myShowSchedules.length; i++) {
        const getShowSchedule = await showScheduleManagerContract.methods
          .getShowSchedule(parseInt(myShowSchedules[i]))
          .call();
        tmp.push({ getShowSchedule });
      }
      setShowArray(tmp);
    } catch (err) {
      console.error(err);
    }
  };

  // 갤러리 S -> M
  const onChangeGallery = async () => {
    try {
      const data = {
        gallery: "galleryM",
        timestamp: new Date().getTime(),
      };
      const sign = await signMessage(JSON.stringify(data));
      const sendData = { info: data, hash_sign: sign };
      const res = await axios.patch(
        `https://nfticket.plus/api/v1/account/${userInfo.account}/gallery`,
        sendData
      );
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("지갑주소", userInfo);
  const signMessage = async (message) => {
    // 메타마스크가 없으면 에러
    if (!window.ethereum) throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    return signature;
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {isConnected ? (
        <>
          <ConnectedContainer>
            {/* 배경 */}
            <img
              src="images/profile_img2.png"
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
                    top: "370px",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={`https://nfticket.plus/showipfs/ipfs/${walletInfo.image_uri}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "images/MetaMask_Fox.svg.png";
                    }}
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
                  paddingTop: "20px",
                }}
              >
                <div>
                  <img
                    src="images/unity_logo_icon.png"
                    alt=""
                    onClick={onChangeGallery}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      height: "25px",
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  />
                </div>
                {/* <PhotoLibraryIcon
                  onClick={onChangeGallery}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                ></PhotoLibraryIcon> */}
                <Link to="/MyPage/Settings">
                  <SettingsIcon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      height: "30px",
                      marginLeft: "0.4rem",
                      width: "30px",
                      marginRight: "10px",
                    }}
                  />
                </Link>
                <LogoutIcon
                  onClick={onDisconnect}
                  style={{
                    color: "black",
                    height: "30px",
                    width: "30px",
                    marginLeft: "0.5rem",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
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
                marginTop: "0.5rem",
              }}
            >
              {/* 닉네임 */}
              <UserInfo>
                <h1>{walletInfo.nickname}</h1>
              </UserInfo>
              {/* 지갑 주소 */}
              <div
                style={{
                  width: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  border: "1px solid grey",
                  borderRadius: "20px",
                  padding: "0.5rem",
                  display: "flex",
                }}
              >
                <img
                  src="images/ethereum.png"
                  alt="eth"
                  style={{ width: "20px", height: "20px" }}
                />
                <div
                  style={{
                    width: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userInfo.account}
                </div>
              </div>
              {/* 설명 */}
              <UserInfo>
                <p>{walletInfo.description}</p>
              </UserInfo>
              <Button onClick={wtRoyalty} style={{ marginTop: "1rem" }}>
                Withdraw
              </Button>
            </div>
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
                  판매 티켓
                </NavListItemSelected>
              ) : (
                <NavListItem onClick={() => handlePageNum(2)}>판매 티켓</NavListItem>
              )}
              {pageNum === 3 ? (
                <NavListItemSelected onClick={() => handlePageNum(2)}>
                  등록 공연
                </NavListItemSelected>
              ) : (
                <NavListItem onClick={() => handlePageNum(3)}>등록 공연</NavListItem>
              )}
            </NavList>

            {pageNum === 1 && (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {/* <TitleText>나의 티켓</TitleText> */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "1080px",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* <DescriptionDiv> */}
                    <Grid container>
                      {/* <h1>냉내용</h1> */}
                      {ticketArray &&
                        ticketArray.map((v, i) => {
                          return (
                            <Grid item xs={3}>
                              <MyTicketItem key={i} {...v} />
                            </Grid>
                          );
                        })}
                    </Grid>
                    {/* </DescriptionDiv> */}
                  </div>
                </div>
              </div>
            )}

            {pageNum === 2 && (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {/* <TitleText>나의 티켓</TitleText> */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "1080px",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* <DescriptionDiv> */}
                    <Grid container>
                      {/* <h1>냉내용</h1> */}
                      {myTicketArray &&
                        myTicketArray.map((v, i) => {
                          return (
                            <Grid item xs={3}>
                              <Tmp key={i} {...v} />
                            </Grid>
                          );
                        })}
                    </Grid>
                    {/* </DescriptionDiv> */}
                  </div>
                </div>
              </div>

              // <div>
              //   <TitleText>내가 판매중인 티켓</TitleText>

              //   <DescriptionDiv>
              //     <Grid container>
              //       {myTicketArray &&
              //         myTicketArray.map((v, i) => {
              //           return (
              //             <Grid item xs={3}>
              //               <Tmp key={i} {...v} />
              //             </Grid>
              //           );
              //         })}
              //     </Grid>
              //   </DescriptionDiv>
              // </div>
            )}

            {pageNum === 3 && (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {/* <TitleText>나의 티켓</TitleText> */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "1080px",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* <DescriptionDiv> */}
                    <Grid container>
                      {/* <h1>냉내용</h1> */}
                      {showArray &&
                        showArray.map((v, i) => {
                          return (
                            <Grid item xz={3}>
                              <MyShow key={i} {...v} />
                            </Grid>
                          );
                        })}
                    </Grid>
                    {/* </DescriptionDiv> */}
                  </div>
                </div>
              </div>
              // <div>
              //   <TitleText>내가 등록한 공연</TitleText>
              //   <DescriptionDiv>
              //     <Grid container>
              //       {showArray &&
              //         showArray.map((v, i) => {
              //           return (
              //             <Grid item xz={3}>
              //               <MyShow key={i} {...v} />
              //             </Grid>
              //           );
              //         })}
              //     </Grid>
              //   </DescriptionDiv>
              // </div>
            )}
          </div>
        </>
      ) : (
        <UnconnectedContainer>
          <h1>아래 버튼을 눌러 지갑을 연결해주세요.</h1>
          <LogInButton variant="contained" onClick={onC}>
            <img
              src="images/MetaMask_Fox.svg.png"
              alt="foxie"
              style={{ width: "50px", height: "50px" }}
            />
            Metamask
          </LogInButton>
        </UnconnectedContainer>
      )}
    </div>
  );
}

export default MyPage;
