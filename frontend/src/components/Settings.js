import axios from "axios";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import ProfileImage from "./ProfileImage";

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputForm = styled.input`
  height: 2rem;
  padding-left: 1rem;
  width: 30%;
  font-size: 1rem;
`;

function Settings() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signMessage = async (message) => {
    // 메타마스크가 없으면 에러
    if (!window.ethereum) throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    return signature;
  };

  const editInfo = async () => {
    const data = {
      nickname: userInfo.nickname,
      description: userInfo.description,
      image_uri: userInfo.image_uri,
      timestamp: new Date().getTime(),
    };
    const sign = await signMessage(JSON.stringify(data));
    const sendData = { info: data, hash_sign: sign };
    axios
      .patch(`https://nfticket.plus/api/v1/account/edit/${userInfo.wallet_id}`, sendData)
      .then((res) => {
        console.log(res);
        if (res.status) {
          navigate("/MyPage");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUserInfo = () => {
    if (localStorage.getItem("userAccount")) {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      // .get
      axios
        .get(`https://nfticket.plus/api/v1/profile/${userData.account}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      return;
    }
  };
  console.log(userInfo);
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SettingContainer>
      <h1>Profile Settings</h1>
      <ProfileImage userInfo={userInfo} setUserInfo={setUserInfo} />
      <h2>Username</h2>
      <InputForm
        type="text"
        name="nickname"
        placeholder="Enter Nickname"
        value={userInfo.nickname}
        onChange={handleChange}
      />
      <h2>Description</h2>
      <InputForm
        type="text"
        name="description"
        placeholder="Enter Description"
        value={userInfo.description}
        onChange={handleChange}
      />
      <div>
        <Button variant="contained" onClick={editInfo} style={{ marginTop: "1rem" }}>
          수정
        </Button>
        <Button
          onClick={() => {
            navigate("/MyPage");
          }}
          style={{ marginTop: "1rem" }}
        >
          돌아가기
        </Button>
      </div>
    </SettingContainer>
  );
}

export default Settings;
