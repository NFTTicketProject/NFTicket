import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
// import {Link} from 'react-router-dom';

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
        // unityContext.send("NetworkManager", "CreateRoomWebGL", "GalleryS")
        // unityContext.send("NetworkManager", "CreateRoomWebGL", "GalleryM")
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

  // function speedIncrease() {
  //   // parameter : gameObjectName, methodName, parameter(string, number, boolean)
  //   unityContext.send("Player", "SpeedUp");
  // }

  // function speedDecrease() {
  //   unityContext.send("Player", "SpeedDown");
  // }

  function setImage1() {
    // unityContext.send("Image1", "SetUrl", "https://storage.googleapis.com/tupli_profile/4766/images.jpeg");
    // unityContext.send("Image1", "SetUrl", "https://docs.unity3d.com/uploads/Main/ShadowIntro.png");
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

  // function takeScreenShot() {
  //   const data = unityContext.takeScreenshot("image/jpeg", 1.0);
  //   if (data !== null) {
  //     window.open(data, "_blank");
  //   }
  // }

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }

  return (
  <div>
    <div> 현재 속도 : {speed}</div>
    <div> 방 이름 : {roomName}</div>
    {/* <button onClick={speedIncrease}>이동속도 증가</button>
    <button onClick={speedDecrease}>이동속도 감소</button> */}
    <button onClick={setImage1}>이미지1 변경</button>
    <button onClick={setImage2}>이미지2 변경</button>
    <button onClick={setImage3}>이미지3 변경</button>
    <button onClick={setWindow1}>카드1 변경</button>
    <button onClick={setWindow2}>카드2 변경</button>
    {/* <button><Link to ='/Redux2'>Page2로 이동</Link></button> */}
    {/* <button onClick={takeScreenShot}>스크린샷</button> */}
    <button onClick={handleOnClickFullscreen}>Fullscreen</button>
    <div>
    <form onSubmit={onSubmit}>
      <input
        style={{width: '900px'}}
        onChange={onChange}
        value={image}
        type="text"
        placeholder="이미지 url"
      ></input>
      <button>이미지 변경</button>
    </form>
    </div>
    <div>
      <Unity style={{width:'1080px', height:'720px', border: "5px solid black", background: "grey"}} unityContext={unityContext} />
      {/* <Unity style={{width:'1920px', height:'1080px', border: "5px solid black", background: "grey"}} unityContext={unityContext} /> */}
    </div>
    <hr/>
    <pre>
      네트환경이 구축되어있습니다.<br/>
      단, 커뮤니티는 현재 입장하실 수 없습니다.<br/>
      <br/>
      Noname의 방으로 가실 경우 꾸며놓은 커다란 방을, 그외 유저의 방은 기본 회색 방으로 되어있습니다.  <br/>
      로비에서 닉네임 입력 후 변경시, 변경된 닉네임으로 동작합니다. (Default : Noname)  <br/>
      로비에서 방 입력으로 타인의 방에 입장하실 수 있습니다. 현재 보여주는 이미지는 기본값입니다.  <br/>
      (존재하지 않는 회원입니다. 유니티쪽에 구현해두었지만 현재 react 쪽에서 요청하지 않았습니다.)  <br/>
      <br/>
      기본 동작 설명 <br/>
      <br/>
      방에서 3 : 카메라 시점 변경 활성화  <br/>
      방에서 엔터 : 채팅 활성화  <br/>
      방에서 휠 : 시야 조절  <br/>
      전시물 근처에 갈 경우 티켓 관련 해설을 볼 수 있습니다.
    </pre>
  </div>
  );
};


export default Page5;
