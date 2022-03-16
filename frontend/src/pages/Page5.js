import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

// const Page5 = () => {
//   return <div>민구님 넹</div>;
// };

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
    unityContext.send("Image1", "SetUrl", "https://ipfs.io/ipfs/QmcPQmFDTccb7RE5LWtVjZi48ffmd6hoDtEMj8MNhnGN7a?filename=QmcPQmFDTccb7RE5LWtVjZi48ffmd6hoDtEMj8MNhnGN7a");
  }

  function setImage2() {
    unityContext.send("Image2", "SetUrl", "https://ipfs.io/ipfs/Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v?filename=Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v");
  }

  function setImage3() {
    unityContext.send("Image3", "SetUrl", "https://ipfs.io/ipfs/Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v?filename=Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v");
  }

  function setWindow1() {
    unityContext.send("Window1", "SetUrl", "https://ipfs.io/ipfs/QmbgvxydAHqrxUuPttagFv3KqZyYJNwaYhrJVWkjdFbdRT");
  }

  function setWindow2() {
    unityContext.send("Window2", "SetUrl", "https://ipfs.io/ipfs/Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v?filename=Qmdi9KQ8c5ifTeZVLwKJBgtir6cDVHQ9fLuxob9Mgdnd1v");
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
    {/* <button onClick={speedIncrease}>이동속도 증가</button>
    <button onClick={speedDecrease}>이동속도 감소</button> */}
    <button onClick={setImage1}>이미지1 변경</button>
    <button onClick={setImage2}>이미지2 변경</button>
    <button onClick={setImage3}>이미지3 변경</button>
    <button onClick={setWindow1}>카드1 변경</button>
    <button onClick={setWindow2}>카드2 변경</button>
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
  </div>
  );
};


export default Page5;
