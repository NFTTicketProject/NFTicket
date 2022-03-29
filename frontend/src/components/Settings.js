import axios from "axios";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import CreateImage from "./CreateImage";
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
  const [detailInfo, setDetailInfo] = useState("");

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

  // 닉네임, 설명 수정 가능
  // const editWalletNickname = async () => {
  //   const nickData = { nickname: userInfo.nickname, timestamp: new Date().getTime() };
  //   const nicikSign = await signMessage(JSON.stringify(nickData));
  //   const sendNickData = { info: nickData, hash_sign: nicikSign };
  //   axios
  //     .patch(
  //       `https://j6a102.p.ssafy.io/api/v1/account/edit/nickname/${userInfo.wallet_id}`,
  //       sendNickData
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   navigate("/MyPage");
  // };
  // const editWalletDescription = async (e) => {
  //   e.preventDefault();
  //   const desData = { description: userInfo.description, timestamp: new Date().getTime() };
  //   const desSign = await signMessage(JSON.stringify(desData));
  //   const sendDesData = { info: desData, hash_sign: desSign };
  //   axios
  //     .patch(
  //       `https://j6a102.p.ssafy.io/api/v1/account/edit/description/${userInfo.wallet_id}`,
  //       sendDesData
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  const editProfileImage = async () => {
    const profileData = {
      image_url: userInfo.image_url,
      timestamp: new Date().getTime(),
    };
    const profileSign = await signMessage(JSON.stringify(profileData));
    const sendProfileData = { info: profileData, hash_sign: profileSign };
    axios
      .patch(
        `https://j6a102.p.ssafy.io/api/v1/account/edit/imageurl/${userInfo.wallet_id}`,
        sendProfileData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickEdit = async () => {
    const nickData = { nickname: userInfo.nickname, timestamp: new Date().getTime() };
    const nicikSign = await signMessage(JSON.stringify(nickData));
    const sendNickData = { info: nickData, hash_sign: nicikSign };
    const desData = { description: userInfo.description, timestamp: new Date().getTime() };
    const desSign = await signMessage(JSON.stringify(desData));
    const sendDesData = { info: desData, hash_sign: desSign };
    axios.all(
      [
        axios.patch(
          `https://j6a102.p.ssafy.io/api/v1/account/edit/nickname/${userInfo.wallet_id}`,
          sendNickData
        ),
        axios.patch(
          `https://j6a102.p.ssafy.io/api/v1/account/edit/description/${userInfo.wallet_id}`,
          sendDesData
        ),
      ]
        .then(
          axios.spread((res1, res2) => {
            console.log(res1, res2);
          })
        )
        .catch((err) => console.error(err))
    );
    navigate("/MyPage");
  };

  const getUserInfo = () => {
    if (localStorage.getItem("userAccount")) {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      // .get
      axios
        .get(`https://j6a102.p.ssafy.io/api/v1/profile/${userData.account}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
  };
  console.log(userInfo);
  useEffect(() => {
    getUserInfo();
  }, []);

  ////////

  return (
    <SettingContainer>
      <h1>Profile Settings</h1>
      <ProfileImage userInfo={userInfo} setUserInfo={setUserInfo} />
      {/* <CreateImage detailInfo={detailInfo} setDetailInfo={setDetailInfo} /> */}
      {/* {detailInfo.poster ? <div>{detailInfo.poster}</div> : <div></div>} */}
      <button onClick={editProfileImage}>수정</button>
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
        <Button variant="contained" onClick={onClickEdit} style={{ marginTop: "1rem" }}>
          수정
        </Button>
      </div>
    </SettingContainer>
  );
}

export default Settings;
