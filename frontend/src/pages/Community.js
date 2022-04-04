/* eslint-disable */
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Button from '@mui/material/Button';
import { Container, Grid } from "@mui/material";

// Develop_mode
const unityContext = new UnityContext({
  loaderUrl: "build/02.Gallery.loader.js",
  dataUrl: "build/02.Gallery.data",
  frameworkUrl: "build/02.Gallery.framework.js",
  codeUrl: "build/02.Gallery.wasm",
  // 스크린샷 용
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  }
});

const Community = () => {
  const [speed, SetSpeed] = useState(0);
  const [nickname, SetNickname] = useState("Noname");
  const [roomName, SetRoomName] = useState("입장중");
  const [image, Setimage] = useState("https://docs.unity3d.com/uploads/Main/ShadowIntro.png");
  // 사용가능횟수 = 1000회/하루?? : https://www.youtube.com/watch?v=L3wJi7dvH2I
  // const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"
  const imageSERVER = "https://j6a102.p.ssafy.io/showipfs/ipfs/"

  const FileSaver = require('file-saver')

  // 지갑 내지 닉네임으로 정보를 얻어와서 필요한 이미지와 관련 정보를 세팅함
  function loadTickets() {
    var image1, image2, image3, image4, image5;
    var title1, title2;
    var desc1, desc2;
    image1 = "https://ipfs.io/ipfs/QmUwEVMbMCsW2ZJxVx2qXrvtJC6i4KVs9DCw6kgEQsVnVw";
    image2 = "https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image3 = "https://ipfs.io/ipfs/QmPufqDQgKCaLNVDqyYbdGVnZduEFt9VY5wq46t6kiiL7x";
    image4 = "https://ipfs.io/ipfs/Qme2ufsSCBHdFDWTzS8fTfWRcXRq9HMhdN1MMX8dajedLb";
    image5 = "https://ipfs.io/ipfs/Qma6KCK95FdQ3g5Ai8owWxbm14qKjz2d8YBWdFcj3QirLf";
    title1 = "티켓10";
    desc1 = "기본적인 설명2";
    title2 = "Ticket2";
    desc2 = " 띄어쓰기와 \n 엔터 테스트 등의 기본적인 정보 보내기"
  
    unityContext.send("Image1", "SetUrl", image1);
    unityContext.send("Image2", "SetUrl", image2);
    unityContext.send("Image3", "SetUrl", image3);
    unityContext.send("Window1", "SetUrl", image4);
    unityContext.send("Window2", "SetUrl", image5);
    unityContext.send("Zone1", "SetTitle", title1);
    unityContext.send("Zone2", "SetTitle", title2);
    unityContext.send("Zone1", "SetDesc", desc1);
    unityContext.send("Zone2", "SetDesc", desc2);
  }

  // 방 이름 얻어오고 각종 정보 확보하고 이미지 세팅하기
  useEffect(() => {
    unityContext.on("GetRoomName", function(name) {
      // Unity->React로 방을 만들었다는 내용을 보낸다
      if (name === "입장완료") {
        // 입장 완료시 티켓 정보를 보내줌
        loadTickets();
      // 커뮤니티 입장하겠다는 선언
      } else if (name === "commuSSAFY") {
        // 입장 조건을 갖추지 못했을때와 그럴때 둘 다 대응
        console.log(nickname)
        if (nickname === "Guest") {
          // 입장 가능
          unityContext.send("NetworkManager", "CreateCommu", galleryType)
        } else {
          // 입장 불가
          unityContext.send("NetworkManager", "SetErrorMessage", "커뮤니티 입장 조건을 만족하지 않으셨습니다.")
        }
      // 방 입장하겠다는 선언 : 방을 만들기 위한 정보로 사용할 닉네임 내지 지갑 주소를 받는다
      } else {
        // 입력 정보가 지갑일 경우, 닉네임으로 변경 (현재 임시 함수)
        if (name.length < 10) SetRoomName(name);

        // 기본 방
        var galleryType = "GalleryS"
        // 특정 유닛을 위한 중간 방
        if (name === "Noname") galleryType = "galleryM"   
        // 예시용 조건
        if (name === "Guest") {
          // 입장 불가
          unityContext.send("NetworkManager", "SetErrorMessage", "해당 유저는 존재하지 않습니다.")
        } else {          
          // 입장 가능
          unityContext.send("NetworkManager", "CreateRoomWebGL", galleryType)
        }  
      }      
    });
  }, [nickname])

  useEffect(function() {
    unityContext.on("GetSpeed", function(speed) {
      SetSpeed(speed);
    });
  }, []);

  useEffect(function() {
    unityContext.on("GetNickName", function(name) {
      console.log("닉넴", name)
      if (name === "start") {
        unityContext.send("NetworkManager", "SetNickNameReact", "초기닉네임");
      } else {
        SetNickname(name);
      }
    });
  }, []);

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }

  function handleOnClickTakeScreenshot() {
    const data = unityContext.takeScreenshot("image/jpeg", 1.0);
    if (data !== null) {
      FileSaver.saveAs(data, "screenshot.jpg")
    }
  }

  return (
  <Container fixed sx={{my: 2}}>
    <Grid 
      container 
      spacing={0} 
      direction="column"
      alignItems="center"
      >
      <Unity style={{width:'1080px', height:'720px', border: "5px solid black", background: "grey"}} unityContext={unityContext} />
        {/* <Unity style={{width:'1920px', height:'1080px', border: "5px solid black", background: "grey"}} unityContext={unityContext} /> */}
    </Grid>
    <Grid 
      container 
      spacing={0}
      direction="row"
      justifyContent="flex-end"
      sx={{my:2}}
      >
      <Grid item xs={1}>
        <Button variant="contained" onClick={handleOnClickTakeScreenshot}>스크린샷</Button>
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained" onClick={handleOnClickFullscreen}>Fullscreen</Button>
      </Grid>
    </Grid>
    <hr/>
    방문자를 위한 안내 :  <br/>
    닉네임을 Guest로 변경하실 경우, SSAFY NFT 티켓이 없으셔도 커뮤니티에 들어가실 수 있게 열어두었습니다.
  </Container>
  );
};


export default Community;
