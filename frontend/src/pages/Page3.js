import React, { useRef, useState } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stamp1 from "../images/stamp/stamp1.png";
import stamp2 from "../images/stamp/stamp2.png";
import stamp3 from "../images/stamp/stamp3.png";
import stamp4 from "../images/stamp/stamp4.png";
import stamp5 from "../images/stamp/stamp5.png";
import stamp6 from "../images/stamp/stamp6.png";
import stamp7 from "../images/stamp/stamp7.png";

const Page3 = () => {
  const [imagePath, SetImagePath] = useState("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/be0a9a4b-1957-4a83-a542-fb720a0a660e/d17qhno-e7454092-80aa-4b3d-898a-96198b4a756c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JlMGE5YTRiLTE5NTctNGE4My1hNTQyLWZiNzIwYTBhNjYwZVwvZDE3cWhuby1lNzQ1NDA5Mi04MGFhLTRiM2QtODk4YS05NjE5OGI0YTc1NmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Kntd9m3HPNC-JF5QcIS3Iew_dNN68BOt4oeiOTj_Rgs");

  const myTheme = {};
  const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"
  const editorRef = useRef(null);
  const FileSaver = require('file-saver')

  // setState 관련 임시 함수
  // const onClick = (event) => {
  //   SetImagePath(event.target.value)
  // };

  // const ipfsClient = require('ipfs-http-client')
  // const ipfs = ipfsClient.create({ host: 'j6a102.p.ssafy.io', port: '5001', protocol: 'http' }) 

  const editorAddImage = () => {editorRef.current.getInstance().addImageObject(imageSERVER + 'https://docs.unity3d.com/uploads/Main/ShadowIntro.png');}
  // 이미지 조절 관련 이슈로 질문 올린 상태 : https://github.com/nhn/tui.image-editor/issues/741
  const editorAddImage2 = () => {editorRef.current.getInstance().addImageObject(stamp1)
    .then( res => {
      const editorInstance = editorRef.current.getInstance();
      var canvasSize = editorInstance.getCanvasSize();
      editorInstance.setObjectProperties(res.id, {width:canvasSize.width, height:canvasSize.height - 10}) 
      }
    );}
  const editorAddStamp1 = () => {editorRef.current.getInstance().addImageObject(stamp1);}
  const editorAddStamp2 = () => {editorRef.current.getInstance().addImageObject(stamp2);}
  const editorAddStamp3 = () => {editorRef.current.getInstance().addImageObject(stamp3);}
  const editorAddStamp4 = () => {editorRef.current.getInstance().addImageObject(stamp4);}
  const editorAddStamp5 = () => {editorRef.current.getInstance().addImageObject(stamp5);}
  const editorAddStamp6 = () => {editorRef.current.getInstance().addImageObject(stamp6);}
  const editorAddStamp7 = () => {editorRef.current.getInstance().addImageObject(stamp7);}

  // const editorToBase64 = async () => {
  //   const editorInstance = editorRef.current.getInstance();
  //   var image = editorInstance.toDataURL();

  //   // image to Blob(Binary Large Object)
  //   var byteString = window.atob(image.split(',')[1]);
  //   var mimeString = image.split(',')[0].split(':')[1].split(';')[0]
  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }
  //   var blob = new Blob([ab], {type: mimeString});
  //   // console.log('블롭', blob)

  //   try{
  //     const result = await ipfs.add(blob) 
  //     console.log("결과", result);
  //     console.log("주소", result.path)
  //   } catch(e){
  //     console.log("에러 : ", e)
  //   }
  // }

  return(
    <div>  
      <ImageEditor
      ref={editorRef}
      includeUI={{
        loadImage: {
          // 기본사진
          path: imagePath,
          name: "SampleImage",
        },
        theme: myTheme,
        menu: [
          // 넣고싶은 기능을 이 배열에서 없애거나 추가할 수 있습니다.
          // "resize",
          // "crop",
          "flip",
          "rotate",
          "draw",
          // "shape",
          "icon",
          "text",
          // "mask",
          "filter",
        ],
        initMenu: "filter",
        uiSize: {
          width: "1000px",
          height: "700px",
        },
        menuBarPosition: "top",
      }}
      cssMaxHeight={500}
      cssMaxWidth={700}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
      usageStatistics={true}
    />
    <hr/>
    <button onClick={editorAddImage}> URL 이미지 추가 </button>
    <button onClick={editorAddImage2}> 사이즈 조절 안되는 이유 </button>
    {/* <button onClick={editorToBase64}> 저장하기 </button> */}
    <hr/>
    <img src={stamp1} alt="logo" onClick={editorAddStamp1}></img>
    <img src={stamp2} alt="logo" onClick={editorAddStamp2}></img>
    <img src={stamp3} alt="logo" onClick={editorAddStamp3}></img>
    <img src={stamp4} alt="logo" onClick={editorAddStamp4}></img>
    <img src={stamp5} alt="logo" onClick={editorAddStamp5}></img>
    <img src={stamp6} alt="logo" onClick={editorAddStamp6}></img>
    <img src={stamp7} alt="logo" onClick={editorAddStamp7}></img>
  </div>
  )
};

export default Page3;
