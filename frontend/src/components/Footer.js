import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FeedIcon from "@mui/icons-material/Feed";
import Snackbar from "@mui/material/Snackbar";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 12rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgb(0, 58, 255);
  background: linear-gradient(
    92deg,
    rgba(0, 58, 255, 1) 0%,
    rgba(34, 34, 34, 1) 5%,
    rgba(34, 34, 34, 1) 95%,
    rgba(229, 0, 197, 1) 100%
  );
`;

// Left
const LeftArea = styled.div`
  width: 300px;
`;

const TitleCss = styled.div`
  margin-left: 160px;
  margin-top: 40px;
  color: white;
  font-size: 22px;
`;

// Middle
const MiddleArea = styled.div`
  width: 700px;
`;

const MiddleTop = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 45px;
`;

const MiddleTopUnits = styled.div`
  margin-left: 20px;
  color: white;
  font-size: 12px;
  cursor: pointer;
`;

const MiddleMid = styled.div`
  color: white;
  font-size: 12px;
  margin: 20px;
`;

const MiddleBot = styled.div`
  color: white;
  font-size: 12px;
  margin: 20px;
`;

// Right
const RightArea = styled.div`
  display: flex;
  justify-content: right;
  width: 300px;
  margin-top: 30px;
  margin-bottom: 140px;
  padding-right: 140px;
`;

const RightUnits = styled.div`
  margin: 20px;
  cursor: pointer;
`;

// const FooterContainer = styled.div`
//   width: 100%;
//   height: 200px;
//   position: absolute;
//   bottom: 0;
//   background-color: black;
// `;

const Footer = () => {
  const navigate = useNavigate();

  const [snackBar, openSnackBar] = useState(false);

  const copyEmail = () => {
    openSnackBar(true);
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = "mingu4969@gmail.com";
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  };

  const handleClose = () => {
    openSnackBar(false);
  };

  const action = <React.Fragment></React.Fragment>;

  return (
    <FooterContainer>
      <LeftArea>
        <TitleCss>NFTicket</TitleCss>
      </LeftArea>
      <MiddleArea>
        <MiddleTop>
          <MiddleTopUnits
            onClick={() => {
              window.open("https://www.ssafy.com/");
            }}
          >
            SSAFY
          </MiddleTopUnits>
          <MiddleTopUnits onClick={() => navigate("/guide")}>
            ???????????? ??????(FAQ)
          </MiddleTopUnits>
          <MiddleTopUnits onClick={copyEmail}>1:1 ????????????</MiddleTopUnits>
        </MiddleTop>
        <MiddleMid>
          NFTicket??? ??????????????????????????????????????? ?????? ??? ????????? NFT ????????? ??????
          ?????? ??????????????????.
          <br></br>?????? ????????? ????????? ??????????????? ?????? ????????? ???????????? ?????????
          ???????????? ???????????? ????????????.
        </MiddleMid>
        <MiddleBot>
          copyright ?? 2022 Non Fungible Turtles. All rights reserved
        </MiddleBot>
      </MiddleArea>
      <RightArea>
        <RightUnits>
          <GitHubIcon
            style={{ color: "#FFFFFF" }}
            onClick={() => {
              window.open(
                "https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22A102",
              );
            }}
          ></GitHubIcon>
        </RightUnits>
        <RightUnits>
          <YouTubeIcon
            style={{ color: "#FFFFFF" }}
            onClick={() => {
              window.open("https://www.youtube.com/");
            }}
          ></YouTubeIcon>
        </RightUnits>
        <RightUnits>
          <FeedIcon
            style={{ color: "#FFFFFF" }}
            onClick={() => {
              window.open(
                "https://extreme-xylocarp-87d.notion.site/NFTicket-1cb9a09dfd064724aa90e3eec6ffab0f",
              );
            }}
          ></FeedIcon>
        </RightUnits>
      </RightArea>
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        message='????????? ?????? ????????? ?????????????????????.'
        action={action}
      />
    </FooterContainer>
  );
};

export default Footer;
