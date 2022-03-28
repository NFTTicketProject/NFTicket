/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stamp1 from "../images/stamp/stamp1.png";

import { Container, Grid } from "@mui/material";
import Button from '@mui/material/Button';

import DrawerMain from "../components/toast/DrawerMain.js";
import { useSearchParams } from "react-router-dom";

// 주소 있을 경우 : http://localhost:3000/Toast%20UI?ticket=https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV
// 주소 없을 경우 : http://localhost:3000/Toast%20UI
const Page3 = () => {
  const [searchParams] = useSearchParams();
  const [imagePath, SetImagePath] = useState("");
  const [imageSavedPath, SetImageSavedPath] = useState('');

  const myTheme = {};
  const editorRef = useRef(null);
  const FileSaver = require('file-saver')  // 이거 있어야 다운로드 작동함

  const ipfsClient = require('ipfs-http-client')
  // const ipfs = ipfsClient.create({ host: 'j6a102.p.ssafy.io/ipfs', port: '443', protocol: 'https' }) 
  const ipfs = ipfsClient.create(new URL('https://j6a102.p.ssafy.io/ipfs/api/v0')) 

  // 각종 정보 확보하고 이미지 세팅하기
  useEffect(() => {
    var ticketPath = searchParams.get('ticket');
    // console.log('t', ticketPath);
    if (ticketPath !== null) {
      SetImagePath(ticketPath)
    } else {
      ticketPath = "https://ipfs.io/ipfs/QmXRhj2jj3TJFHMq5C1qsxskcbTwdtAb1LSgeL6neT6MP8"
    }
    editorRef.current.getInstance().loadImageFromURL(ticketPath, 'newTicket').then(() => {
      console.log("A")
      // editorRef.current.getInstance().redo();
      // editorRef.current.getInstance().resetFlip();
      // editorRef.current.getInstance().startDrawingMode('FREE_DRAWING');
      // editorRef.current.getInstance().clearObjects();
    })
    // editorRef.current.getInstance().changeSelectableAll(false);
    // editorRef.current.getInstance().clearObjects();
    console.log("B")
  }, [])

  // 이미지 조절 관련 이슈로 질문 올린 상태 : https://github.com/nhn/tui.image-editor/issues/741
  const editorAddImage = () => {editorRef.current.getInstance().addImageObject(stamp1)
    .then( res => {
      const editorInstance = editorRef.current.getInstance();
      var canvasSize = editorInstance.getCanvasSize();
      editorInstance.setObjectProperties(res.id, {width:canvasSize.width, height:canvasSize.height - 10}) 
      }
    );}

  const editorImageChange = () => {editorRef.current.getInstance().loadImageFromURL(imagePath, 'newTicket')}
  function editorAddStamp(stamp) {editorRef.current.getInstance().addImageObject(stamp);}  // 상속 함수

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
      return <div>
        이미지 주소 외부 : <a href={'https://ipfs.io/ipfs/'+imageSavedPath}>https://ipfs.io/ipfs/{imageSavedPath}</a>
        <div>속도 테스트 내부 : <img src={'https://j6a102.p.ssafy.io/showipfs/ipfs/'+imageSavedPath} alt="logo" loading="lazy"></img></div>
        <div>속도 테스트 외부 : <img src={'https://ipfs.io/ipfs/'+imageSavedPath} alt="logo" loading="lazy"></img></div>
      </div>
    }
    return null;
  }

  return(
    <Grid container spacing={2}>
      <Grid item xs = {2}>
        <DrawerMain editorAddStamp={editorAddStamp}></DrawerMain>
      </Grid>
      <Grid item xs = {10}>
        <Container sx={{mt:"30px"}}>
          <Grid 
            container 
            spacing={0} 
            direction="column"
            alignItems="center"
            >
          <ImageEditor
          ref={editorRef}
          includeUI={{
            // 기본사진 (최초 로딩 1회 있어야 작동 시작함)
            loadImage: {
              path: "https://ipfs.io/ipfs/QmXRhj2jj3TJFHMq5C1qsxskcbTwdtAb1LSgeL6neT6MP8",
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
          </Grid>
          <hr/>
          <Grid 
            container 
            spacing={0}
            direction="column"
            alignItems="flex-end"
            sx={{my:2}}
            >
            <Button variant="contained" onClick={editorToBase64}>저장하기</Button>
          </Grid>  
          <ImageSavedShow />    
        </Container>
      </Grid>
    </Grid>
  )
};

export default Page3;
