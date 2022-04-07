/* eslint-disable */
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import {
  myTicketContract,
  showScheduleAbi,
  showScheduleManagerContract,
  web3,
} from "../utils/web3Config";

import styled from "styled-components";
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';


// Develop_mode
const unityContext = new UnityContext({
  loaderUrl: "build/02.Gallery.loader.js",
  dataUrl: "build/02.Gallery.data",
  frameworkUrl: "build/02.Gallery.framework.js",
  codeUrl: "build/02.Gallery.wasm",
  // 스크린샷 용
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

const CommunityBox = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 1280px;
`;

const Community = () => {
  const [speed, SetSpeed] = useState(0);
  const [nickname, SetNickname] = useState("Noname");
  const [members, SetMembers] = useState([]); // 입장용
  const [roomName, SetRoomName] = useState("입장중");
  const [image, Setimage] = useState(
    "https://docs.unity3d.com/uploads/Main/ShadowIntro.png",
  );
  const [ticketArray, setTicketArray] = useState([]); // 티켓 정보 최신순
  // 사용가능횟수 = 1000회/하루?? : https://www.youtube.com/watch?v=L3wJi7dvH2I
  // const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"
  const imageSERVEROrigin = "https://ipfs.io/ipfs/";
  const imageSERVER = "https://nfticket.plus/showipfs/ipfs/";

  const FileSaver = require("file-saver");

  // 지갑 내지 닉네임으로 정보를 얻어와서 필요한 이미지와 관련 정보를 세팅함
  const loadTickets = () => {
    var image1, image2, image3, image4, image5;
    var title1, title2;
    var desc1, desc2;
    image1 = imageSERVER + "QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image2 = imageSERVER + "QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image3 = imageSERVER + "QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image4 = imageSERVER + "QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image5 = imageSERVER + "QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    title1 = "NFTicket";
    desc1 =
      "좌석 등급 : None\n공연 설명 : NFTicket에서 더 많은 티켓을 구매하고, 전시하세요!";
    title2 = "NFTicket";
    desc2 =
      "좌석 등급 : None\n공연 설명 : NFTicket에서 더 많은 티켓을 구매하고, 전시하세요!";

    if (ticketArray[0]) {
      image1 = imageSERVER + ticketArray[0].ticketUri;
      if (ticketArray[0].title) {
        title1 = ticketArray[0].title;
      }
      desc1 = ticketArray[0].desc;
    }

    if (ticketArray[1]) {
      image2 = imageSERVER + ticketArray[1].ticketUri;
      if (ticketArray[1].title) {
        title1 = ticketArray[1].title;
      }
      desc2 = ticketArray[1].desc;
    }

    if (ticketArray[2]) {
      image3 = imageSERVER + ticketArray[2].ticketUri;
    }

    if (ticketArray[3]) {
      image4 = imageSERVER + ticketArray[3].ticketUri;
    }

    if (ticketArray[4]) {
      image5 = imageSERVER + ticketArray[4].ticketUri;
    }

    unityContext.send("Image1", "SetUrl", image3);
    unityContext.send("Image2", "SetUrl", image4);
    unityContext.send("Image3", "SetUrl", image5);
    unityContext.send("Window1", "SetUrl", image1);
    unityContext.send("Window2", "SetUrl", image2);
    unityContext.send("Zone1", "SetTitle", title1);
    unityContext.send("Zone2", "SetTitle", title2);
    unityContext.send("Zone1", "SetDesc", desc1);
    unityContext.send("Zone2", "SetDesc", desc2);
  };

  // 닉네임을 wallet 으로
  const nicknameToWallet = async (name) => {
    try {
      const response = await axios.post(
        `https://nfticket.plus/api/v1/profile/address-by-nickname`,
        {
          nickname: name,
        },
      );
      if (response) {
        return response.data[0].wallet_id;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // wallet을 nickname 으로
  const walletToNickname = async (wallet) => {
    try {
      const response = await axios.get(
        "https://nfticket.plus/api/v1/profile/" + wallet + "/nickname",
      );
      if (response) {
        return response.data.nickname;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 해당 지갑 소유자가 가지고 있는 모든 티켓 다 긁어오기
  const getTicketsByWallet = async (wallet) => {
    try {
      // wallet : 해당 지갑 소유자
      // 해당 지갑 주소 소유자가 가지고있는 티켓 수
      const balanceLength = await myTicketContract.methods
        .balanceOf(wallet)
        .call();
      console.log("총 갯수", balanceLength);

      const tempArray = [];
      for (let i = 0; i < parseInt(balanceLength, 10); i++) {
        // 거꾸로 가자
        var j = parseInt(balanceLength, 10) - i - 1;
        console.log("j", j);
        // ticketId: 1부터 시작
        const ticketId = await myTicketContract.methods
          .tokenOfOwnerByIndex(wallet, j)
          .call();
        // showScheduleId: 1부터 시작
        const showScheduleId = await myTicketContract.methods
          .getShowScheduleId(ticketId)
          .call();
        // clasId: 1부터 시작 => className(좌석 등급으로 변환)
        const classId = await myTicketContract.methods
          .getClassId(ticketId)
          .call();
        const showScheduleAddress = await showScheduleManagerContract.methods
          .getShowSchedule(showScheduleId)
          .call();
        const showScheduleContract = new web3.eth.Contract(
          showScheduleAbi,
          showScheduleAddress,
        );
        const className = await showScheduleContract.methods
          .getTicketClassName(classId)
          .call();
        // 공연 이름 ??????????????????
        const showId = await showScheduleContract.methods.getShowId().call();
        const showInfo = await axios.get(
          `https://nfticket.plus/api/v1/show/${showId}`,
        );
        // console.log("공연 번호", showId);
        // const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showScheduleId}`);
        // 티켓 이미지 주소
        const ticketUri = await myTicketContract.methods
          .getTokenURI(ticketId)
          .call();
        // console.log("티켓 주소", ticketId, ticketUri);
        // console.log("공연정보", showInfo);
        var showDesc = showInfo.data.description;
        console.log(showDesc);
        if (showDesc) {
          if (showDesc.length > 80)
            showDesc = showDesc.substring(0, 79) + " ...";
        }
        const desc = "좌석 등급 : " + className + "\n공연 설명 : " + showDesc;
        tempArray.push({
          title: showInfo.data.name,
          desc,
          ticketUri,
        });
      }
      setTicketArray(tempArray);
    } catch (err) {
      console.error(err);
    }
  };

  const getGalleryFromWallet = async (walletAddr) => {
    try {
      const response = await axios.get(
        "https://nfticket.plus/api/v1/profile/" + walletAddr + "/gallery",
      );
      if (response) {
        return response.data.gallery;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect 내부에서 async 쓰는 법!
  // 방 이름 얻어오고 각종 정보 확보하고 이미지 세팅하기
  useEffect(() => {
    // 닉네임 입장 : nickname만 있을 경우 wallet 정보 가져오고 입장
    const nicknameControll = async (name) => {
      var wallet = await nicknameToWallet(name);
      await getTicketsByWallet(wallet); // array에 세팅해놓고 입장해야 순서 안 꼬임...
      var galleryType = "galleryS";
      if (wallet) {
        galleryType = await getGalleryFromWallet(wallet);
        // 예외 처리
        if (galleryType != "galleryS" && galleryType != "galleryM")
          galleryType = "galleryS";
        // 특수 조건
        if (name === "Noname") galleryType = "galleryM";
        // 입장
        unityContext.send("NetworkManager", "CreateRoomWebGL", galleryType);
      } else {
        // 입장 불가
        unityContext.send(
          "NetworkManager",
          "SetErrorMessage",
          "해당 유저는 존재하지 않습니다.",
        );
      }
    };

    // wallet 입장 : wallet만 있을 경우 nickname 정보 가져오고 입장
    const walletControll = async (wallet) => {
      await getTicketsByWallet(wallet); // array에 세팅해놓고 입장해야 순서 안 꼬임...
      var name = await walletToNickname(wallet);
      var galleryType = "galleryS";
      if (name) {
        SetRoomName(name);
        galleryType = await getGalleryFromWallet(wallet);
        // 예외 처리
        if (galleryType != "galleryS" && galleryType != "galleryM")
          galleryType = "galleryS";
        // 특수 조건
        if (name === "Noname") galleryType = "galleryM";
        // 입장
        unityContext.send("NetworkManager", "CreateRoomWebGL", galleryType);
      } else {
        // 입장 불가
        unityContext.send(
          "NetworkManager",
          "SetErrorMessage",
          "해당 유저는 존재하지 않습니다.",
        );
      }
    };

    unityContext.on("GetRoomName", function (name) {
      // Unity->React로 방을 만들었다는 내용을 보낸다
      if (name === "입장완료") {
        // 입장 완료시 티켓 정보를 보내줌
        console.log("순서 측정 3", ticketArray);
        loadTickets();
        // 커뮤니티 입장하겠다는 선언
      } else if (name === "commuSSAFY") {
        // 입장 조건을 갖추지 못했을때와 그럴때 둘 다 대응
        console.log(nickname);
        if (nickname === "Guest") {
          // 입장 가능
          unityContext.send("NetworkManager", "CreateCommu", "galleryS");
        } else {
          // 입장 불가
          unityContext.send(
            "NetworkManager",
            "SetErrorMessage",
            "커뮤니티 입장 조건을 만족하지 않으셨습니다.",
          );
        }
        // 방 입장하겠다는 선언 : 방을 만들기 위한 정보로 사용할 닉네임 내지 지갑 주소를 받는다
      } else {
        // 입력 정보가 지갑일 경우, 닉네임으로 변경 (현재 임시 함수)
        if (name.length < 20) {
          // 아마 닉네임
          nicknameControll(name);
        } else {
          // 아마 지갑
          walletControll(name);
        }
      }
    });
  }, [nickname, ticketArray]);

  useEffect(function () {
    unityContext.on("GetSpeed", function (speed) {
      SetSpeed(speed);
    });
  }, []);

  useEffect(function () {
    unityContext.on("GetNickName", function (name) {
      if (name === "start") {
        unityContext.send("NetworkManager", "SetNickNameReact", "손님");
      } else {
        SetNickname(name);
      }
    });
  }, []);

  // 초기 값 세팅
  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const response = await axios.get(`https://nfticket.plus/api/v1/profile`);
    SetMembers(response.data);
  };

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }

  function handleOnClickTakeScreenshot() {
    const data = unityContext.takeScreenshot("image/jpeg", 1.0);
    if (data !== null) {
      FileSaver.saveAs(data, "screenshot.jpg");
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', marginBottom: '40px'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '1280px', alignItems: 'center', marginTop: '0px', marginBottom: '20px', paddingRight: '10px'}}>
        <CameraEnhanceRoundedIcon style={{ marginRight: '10px', color: '#E500C5'}} onClick={handleOnClickTakeScreenshot}></CameraEnhanceRoundedIcon>
        <FullscreenRoundedIcon onClick={handleOnClickFullscreen}>Fullscreen</FullscreenRoundedIcon>
      </div>
      <CommunityBox>
        <div>
          <Unity style={{ width:'1280px', height:'720px', background: "grey", borderRadius: '15px' }} unityContext={unityContext} />
        </div>
        <hr style={{ width:'1260px', border: "0.8px solid #ababab", marginBottom: "20px", marginTop: '40px' }}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '550px' }}>
              <h3>NFTicket를 보유하지 않은 방문자를 위한 안내</h3>
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px'}}>" 닉네임을 Guest(대소문자 구별)로 변경한 경우,</p>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>SSAFY NFT 티켓이 없으셔도 커뮤니티에 들어가실 수 있습니다. "</p>
              </div>
            </div>
            {/* <div style={{ width: '0.5px', height: '150px', border: '0.5px solid #ababab', marginTop: '30px', marginLeft: '30px', marginRight: '30px', marginRight: '30px' }}></div> */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '440px', marginLeft: '30px' }}>
              <h3>입장 가능한 닉네임 / 방</h3>
              <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px', }}>아래의 텍스트 중 하나를 선택하여 방 찾기를 눌러 입력한 후 입장하시면, </p>
              <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '18px' }}> 해당 방으로 이동할 수 있습니다.</p>
              {members.map((member) => (
                <p style={{ marginBottom: '8px', fontSize: '15px', fontWeight: 400, marginLeft: '4px' }}>  · {member.nickname}</p>
              ))}
            </div>
          </div>
        </div>
    </CommunityBox>
  </div>
  );
};

export default Community;
