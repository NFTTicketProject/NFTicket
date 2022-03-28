/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
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

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

import DrawerMain from "../components/toast/DrawerMain.js";
import { useSearchParams } from "react-router-dom";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


// 주소 있을 경우 : http://localhost:3000/Toast%20UI?ticket=https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV
// 주소 없을 경우 : http://localhost:3000/Toast%20UI
const Page3 = () => {
  const [searchParams] = useSearchParams();
  const [imagePath, SetImagePath] = useState("");
  const [imageSavedPath, SetImageSavedPath] = useState('');

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const myTheme = {};
  const imageSERVER = "https://cdn.filestackcontent.com/AM9o5lgXYR1uvQX2NaAqnz/output=secure:true/"
  const editorRef = useRef(null);
  const FileSaver = require('file-saver')

  // setState 관련 임시 함수
  // const onClick = (event) => {
  //   SetImagePath(event.target.value)
  // };

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
    editorRef.current.getInstance().loadImageFromURL(ticketPath, 'newTicket')
  }, [])


  const editorAddImage = () => {editorRef.current.getInstance().addImageObject(imageSERVER + 'https://docs.unity3d.com/uploads/Main/ShadowIntro.png');}
  // 이미지 조절 관련 이슈로 질문 올린 상태 : https://github.com/nhn/tui.image-editor/issues/741
  const editorAddImage2 = () => {editorRef.current.getInstance().addImageObject(stamp1)
    .then( res => {
      const editorInstance = editorRef.current.getInstance();
      var canvasSize = editorInstance.getCanvasSize();
      editorInstance.setObjectProperties(res.id, {width:canvasSize.width, height:canvasSize.height - 10}) 
      }
    );}

  const editorImageChange = () => {editorRef.current.getInstance().loadImageFromURL(imagePath, 'newTicket')}
  
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
      return <div>
        이미지 주소 외부 : <a href={'https://ipfs.io/ipfs/'+imageSavedPath}>https://ipfs.io/ipfs/{imageSavedPath}</a>
        <div>속도 테스트 내부 : <img src={'https://j6a102.p.ssafy.io/showipfs/ipfs/'+imageSavedPath} alt="logo" loading="lazy"></img></div>
        <div>속도 테스트 외부 : <img src={'https://ipfs.io/ipfs/'+imageSavedPath} alt="logo" loading="lazy"></img></div>
      </div>
    }
    return null;
  }

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${240}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

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
            // 기본사진
            // loadImage: {
            //   path: imagePath,
            //   name: "SampleImage",
            // },
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
