/* eslint-disable */
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
// import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container, Grid } from "@mui/material";

// Develop_mode
const unityContext = new UnityContext({
  loaderUrl: "build/02.Gallery.loader.js",
  dataUrl: "build/02.Gallery.data",
  frameworkUrl: "build/02.Gallery.framework.js",
  codeUrl: "build/02.Gallery.wasm",
  // 스크린샷 용
  // webglContextAttributes: {
  //   preserveDrawingBuffer: true,
  // },
});

const Page5 = () => {
  const [speed, SetSpeed] = useState(0);
  const [roomName, SetRoomName] = useState("입장중");
  const [image, Setimage] = useState("https://docs.unity3d.com/uploads/Main/ShadowIntro.png");
  // 사용가능횟수 = 1000회/하루?? : https://www.youtube.com/watch?v=L3wJi7dvH2I
  const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"

  const onChange = (event) => {
    Setimage(event.target.value)
    unityContext.send("Image1", "SetUrl", image);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      return;
    }
    unityContext.send("Image1", "SetUrl", imageSERVER + image);
  };

  // 지갑 내지 닉네임으로 정보를 얻어와서 필요한 이미지와 관련 정보를 세팅함
  function loadImages() {
    var image1, image2, image3, image4, image5
    image1 = "https://ipfs.io/ipfs/QmUwEVMbMCsW2ZJxVx2qXrvtJC6i4KVs9DCw6kgEQsVnVw";
    image2 = "https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV";
    image3 = "https://ipfs.io/ipfs/QmPufqDQgKCaLNVDqyYbdGVnZduEFt9VY5wq46t6kiiL7x";
    image4 = "https://ipfs.io/ipfs/Qme2ufsSCBHdFDWTzS8fTfWRcXRq9HMhdN1MMX8dajedLb";
    image5 = "https://ipfs.io/ipfs/Qma6KCK95FdQ3g5Ai8owWxbm14qKjz2d8YBWdFcj3QirLf";
  
    unityContext.send("Image1", "SetUrl", image1);
    unityContext.send("Image2", "SetUrl", image2);
    unityContext.send("Image3", "SetUrl", image3);
    unityContext.send("Window1", "SetUrl", image4);
    unityContext.send("Window2", "SetUrl", image5);
  }

  // 방 이름 얻어오고 각종 정보 확보하고 이미지 세팅하기
  useEffect(() => {
    unityContext.on("GetRoomName", function(name) {
      // Unity->React로 방을 만들었다는 내용을 보낸다
      if (name === "입장완료") {
        loadImages();
      } else {
      // 방을 만들기 위한 정보로 사용할 닉네임 내지 지갑 주소를 받는다
        if (name.length < 10) SetRoomName(name);
        var galleryType = "GalleryS"
        if (name === "Noname") galleryType = "galleryM"        

        unityContext.send("NetworkManager", "CreateRoomWebGL", galleryType)
      }      
    });
  }, [])

  useEffect(function() {
    unityContext.on("GetSpeed", function(speed) {
      SetSpeed(speed);
    });
  }, []);


  function setImage1() {
    unityContext.send("Image1", "SetUrl", "https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV");
  }

  function setImage2() {
    unityContext.send("Image2", "SetUrl", "https://ipfs.io/ipfs/QmPufqDQgKCaLNVDqyYbdGVnZduEFt9VY5wq46t6kiiL7x");
  }

  function setImage3() {
    unityContext.send("Image3", "SetUrl", "https://ipfs.io/ipfs/Qme2ufsSCBHdFDWTzS8fTfWRcXRq9HMhdN1MMX8dajedLb");
  }

  function setWindow1() {
    unityContext.send("Window1", "SetUrl", "https://ipfs.io/ipfs/Qma6KCK95FdQ3g5Ai8owWxbm14qKjz2d8YBWdFcj3QirLf");
  }

  function setWindow2() {
    unityContext.send("Window2", "SetUrl", "https://ipfs.io/ipfs/QmUwEVMbMCsW2ZJxVx2qXrvtJC6i4KVs9DCw6kgEQsVnVw");
  }


  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
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
      direction="column"
      alignItems="flex-end"
      sx={{my:2}}
      >
        <Button variant="contained" onClick={handleOnClickFullscreen}>Fullscreen</Button>
    </Grid>
    
    <hr/>
  </Container>
  );
};


export default Page5;
