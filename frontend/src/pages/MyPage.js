import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { saveAccount } from "../store/WalletReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

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

function MyPage() {
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
          .post(`https://j6a102.p.ssafy.io/api/v1/account/${account}`)
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
        .get(`https://j6a102.p.ssafy.io/api/v1/profile/${userData.account}`)
        .then((res) => {
          setWalletInfo(res.data);
          console.log(res);
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    checkConnectedWallet();
  }, []);

  useEffect(() => {
    console.log(walletInfo);
  }, []);

  return (
    <>
      {isConnected ? (
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
                <SettingsIcon style={{ color: "black", height: "30px", width: "30px" }} />
              </Link>
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
              <img src="images/ethereum.png" alt="eth" style={{ width: "20px", height: "20px" }} />
              {userInfo.account}
            </p>
            {/* 설명 */}
            <UserInfo>
              <p>{walletInfo.description}</p>
            </UserInfo>
          </div>
          <div>
            <Button onClick={onDisconnect}>로그아웃</Button>
          </div>
        </ConnectedContainer>
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
