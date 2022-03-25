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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Page3 = () => {
  const [imagePath, SetImagePath] = useState("https://ipfs.io/ipfs/QmXRhj2jj3TJFHMq5C1qsxskcbTwdtAb1LSgeL6neT6MP8");
  const [imageSavedPath, SetImageSavedPath] = useState('');

  const myTheme = {};
  const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"
  const editorRef = useRef(null);
  const FileSaver = require('file-saver')

  // setState 관련 임시 함수
  // const onClick = (event) => {
  //   SetImagePath(event.target.value)
  // };

  const ipfsClient = require('ipfs-http-client')
  const ipfs = ipfsClient.create({ host: 'j6a102.p.ssafy.io', port: '5001', protocol: 'http' }) 

  const editorAddImage = () => {editorRef.current.getInstance().addImageObject(imageSERVER + 'https://docs.unity3d.com/uploads/Main/ShadowIntro.png');}
  // 이미지 조절 관련 이슈로 질문 올린 상태 : https://github.com/nhn/tui.image-editor/issues/741
  const editorAddImage2 = () => {editorRef.current.getInstance().addImageObject(stamp1)
    .then( res => {
      const editorInstance = editorRef.current.getInstance();
      var canvasSize = editorInstance.getCanvasSize();
      editorInstance.setObjectProperties(res.id, {width:canvasSize.width, height:canvasSize.height - 10}) 
      }
    );}
  function editorAddStamp(stamp) {editorRef.current.getInstance().addImageObject(stamp);}

  const itemData = [
    {img: stamp1, title:'no'},
    {img: stamp2, title:'no'},
    {img: stamp3, title:'no'},
    {img: stamp4, title:'no'},
    {img: stamp5, title:'no'},
    {img: stamp6, title:'no'},
    {img: stamp7, title:'no'},
  ]

  const editorToBase64 = async () => {
    const editorInstance = editorRef.current.getInstance();
    var image = editorInstance.toDataURL();

    // image to Blob(Binary Large Object)
    var byteString = window.atob(image.split(',')[1]);
    var mimeString = image.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});

    try{
      const result = await ipfs.add(blob) 
      console.log("결과", result);
      console.log("주소", result.path)
      SetImageSavedPath(result.path)
    } catch(e){
      console.log("에러 : ", e)
    }
  }

  function ImageSavedShow() {
    if (imageSavedPath !== '') {
      return <div>이미지 주소 : <a href={'https://ipfs.io/ipfs/'+imageSavedPath}>https://ipfs.io/ipfs/{imageSavedPath}</a></div>
    }
    return null;
  }

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
        // initMenu: "filter",
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
    {/* <button onClick={editorAddImage2}> 사이즈 조절 안되는 이유 </button> */}
    <button onClick={editorToBase64}> 저장하기 </button>
    <ImageSavedShow />
    <hr/>
    <div>스티커 샘플 모음 (클릭시 티켓에 스티커를 추가할 수 있습니다.)</div>

  <ImageList sx={{ width: 200, height: 200 }} cols={3} rowHeight={10}>
    {itemData.map((item) => (
      <ImageListItem 
        key={item.img}
        onClick={() => {editorAddStamp(item.img)}}>
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>

  </div>
  )
};

export default Page3;
