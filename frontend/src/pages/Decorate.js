/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stamp1 from "../images/stamp/stamp1.png";

import { Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import swal from "sweetalert2";
import DrawerMain from "../components/toast/DrawerMain.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  web3,
  showScheduleAbi,
  ticketSaleAbi,
  myTicketContract,
  IERC20Contract,
  ticketSaleManagerContract,
  showScheduleManagerContract,
} from "../utils/web3Config";

// 주소 있을 경우 : http://localhost:3000/Toast%20UI?ticket=https://ipfs.io/ipfs/QmUQee4Cd3ECfsji4z4h46xQqoEUirJM3UiK6qCZCNjKYV
// 주소 없을 경우 : http://localhost:3000/Toast%20UI
const Decorate = () => {
    // swal
  const Toast = swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
})
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [imagePath, SetImagePath] = useState("");
  const [imageSavedPath, SetImageSavedPath] = useState("");

  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const myTheme = {};
  const editorRef = useRef(null);
  const FileSaver = require("file-saver"); // 이거 있어야 다운로드 작동함

  const ipfsClient = require("ipfs-http-client");
  // const ipfs = ipfsClient.create({ host: 'j6a102.p.ssafy.io/ipfs', port: '443', protocol: 'https' })
  // const ipfs = ipfsClient.create(new URL("https://j6a102.p.ssafy.io/ipfs/api/v0"));
  const ipfs = ipfsClient.create(new URL("https://nfticket.plus/ipfs/api/v0"));


  const GetSeatIndex = async (ticketIdToFind) => {
    // Contract 상에 등록된 공연 스케줄 개수를 가져옵니다
    const showScheduleCount = await showScheduleManagerContract.methods.getCount().call();
    // const showScheduleContracts = []
    let showSchedules = {}

    // 각 공연 스케줄의 정보를 가져옵니다
    for (var i = 1; i <= showScheduleCount; i++)
    {
        const ShowScheduleContractAddr = await showScheduleManagerContract.methods.getShowSchedule(i).call();
        const ShowScheduleContractInstance = new web3.eth.Contract(showScheduleAbi, ShowScheduleContractAddr);

        let showSchedule = {}
        showSchedule.address = ShowScheduleContractAddr;
        showSchedule.ticketClasses = []
        const ticketClassCount = await ShowScheduleContractInstance.methods.getTicketClassCount().call();
        for (var j = 0; j < ticketClassCount; j++)
        {
            var ticketClass = {
                name: await ShowScheduleContractInstance.methods.getTicketClassName(j).call(),
                price: await ShowScheduleContractInstance.methods.getTicketClassPrice(j).call(),
                maxMintCount: await ShowScheduleContractInstance.methods.getTicketClassMaxMintCount(j).call(),
            }

            showSchedule.ticketClasses.push(ticketClass)
        }
        showSchedules[i] = showSchedule
    }
  
    // const ticketIdToFind = 2 // Ticket ID 3번을 찾아보자
    let foundSeat = []
    for (var key of Object.keys(showSchedules))
    {
        const ShowScheduleContractAddr = showSchedules[key].address;
        const ShowScheduleContractInstance = new web3.eth.Contract(showScheduleAbi, ShowScheduleContractAddr);
        
        for (var [i, ticketClass] of showSchedules[key].ticketClasses.entries())
        {
            for (var j = 0; j < ticketClass.maxMintCount; j++)
            {
                const currentTicketId = await ShowScheduleContractInstance.methods.getTicketId(i, j).call()
                if (ticketIdToFind == currentTicketId) foundSeat.push([i, j])
            }
        }
    }
  
    return foundSeat[0][1]
  }

  // 각종 정보 확보하고 이미지 세팅하기
  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    if (imagePath) setTicket();
  }, [imagePath]);

  // 저장 후, 새로운 티켓 민트
  useEffect(() => {
    if (imageSavedPath) changeNewTicket();
  }, [imageSavedPath]);

  const changeNewTicket = async () => {
    // 기존 정보로 새 티켓 만들기
    const showScheduleId = await myTicketContract.methods.getShowScheduleId(ticketId).call();
    const classId = await myTicketContract.methods.getClassId(ticketId).call();
    const createMyTicket = await myTicketContract.methods
      .create(imageSavedPath, parseInt(showScheduleId), parseInt(classId))
      .send({ from: userData.account });
     
    // 새 티켓 거래를 위한 approve
    if (createMyTicket.status) {
      Toast.fire({
            icon: 'success',
            title: `꾸미기 Process 1/4`
            })
      const newTicketId = createMyTicket.events.Transfer.returnValues.tokenId;
      // api 사용해서 백으로 일단 블록해시 넘겨주기 - 나중에 Ticket/:숫자 페이지에서 api로 받아와야 함 //
      const blockHash = createMyTicket.blockHash;
      const sendApi = await axios.post(`https://nfticket.plus/api/v1/block`, {ticket_id: newTicketId, block_hash: blockHash })

      const showScheduleAddress = await showScheduleManagerContract.methods
        .getShowSchedule(showScheduleId)
        .call();
      const approval = await IERC20Contract.methods
        .approve(showScheduleAddress, 500)
        .send({ from: userData.account });
      if (approval.status) {
        Toast.fire({
            icon: 'success',
            title: `꾸미기 Process 2/4`
            })
        const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
        // const registerTicket = await showScheduleContract.methods
        //   // seatIndex 하드코딩
        // .registerTicket(parseInt(classId), parseInt(2), parseInt(newTicketId))
        // .send({ from: userData.account });
        // seatIndex 하드코딩
        var seatIndex = await GetSeatIndex(parseInt(ticketId))
        const registerTicket = await showScheduleContract.methods
          .replaceTicket(parseInt(classId), parseInt(seatIndex), parseInt(ticketId), parseInt(newTicketId))
          .send({ from: userData.account });
        
        // 기존 티켓 태우기
        if (registerTicket.status) {
          Toast.fire({
            icon: 'success',
            title: `꾸미기 Process 3/4`
            })
          const burnOldTicket = await myTicketContract.methods
            .burn(parseInt(ticketId))
            .send({ from: userData.account });
          if (burnOldTicket.status) {
            Toast.fire({
            icon: 'success',
            title: `꾸미기 완료`
            }).then(function(){
              navigate(`/Ticket/${newTicketId}`)
            })
          }
        }
        // } else {
        //   alert("이미 예약된 좌석입니다.");
        // }
      }
    }
  };

  const getTicket = async () => {
    const response = await myTicketContract.methods.getTokenURI(ticketId).call();
    if (response) {
      SetImagePath(response);
    }
  };

  const setTicket = async () => {
    setTimeout(() => {
      editorRef.current
        .getInstance()
        .loadImageFromURL("https://nfticket.plus/showipfs/ipfs/" + imagePath, "newTicket")
        .then(() => {});
    }, 100);
  };

  // 이미지 조절 관련 이슈로 질문 올린 상태 : https://github.com/nhn/tui.image-editor/issues/741
  const editorAddImage = () => {
    editorRef.current
      .getInstance()
      .addImageObject(stamp1)
      .then((res) => {
        const editorInstance = editorRef.current.getInstance();
        var canvasSize = editorInstance.getCanvasSize();
        editorInstance.setObjectProperties(res.id, {
          width: canvasSize.width,
          height: canvasSize.height - 10,
        });
      });
  };

  const editorImageChange = () => {
    editorRef.current.getInstance().loadImageFromURL(imagePath, "newTicket");
  };
  function editorAddStamp(stamp) {
    editorRef.current.getInstance().addImageObject(stamp);
  } // 상속 함수

  const editorToBase64 = async () => {
    const editorInstance = editorRef.current.getInstance();
    var image = editorInstance.toDataURL();

    // image to Blob(Binary Large Object)
    var byteString = window.atob(image.split(",")[1]);
    var mimeString = image.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    try {
      const result = await ipfs.add(blob);
      SetImageSavedPath(result.path);
    } catch (e) {
    }
  };

  function ImageSavedShow() {
    if (imageSavedPath !== "") {
      return (
        <div>
          이미지 주소 외부 :{" "}
          <a href={"https://ipfs.io/ipfs/" + imageSavedPath}>
            https://ipfs.io/ipfs/{imageSavedPath}
          </a>
          <div>
            속도 테스트 내부 :{" "}
            <img
              src={"https://nfticket.plus/showipfs/ipfs/" + imageSavedPath}
              alt="logo"
              loading="lazy"
            ></img>
          </div>
          <div>
            속도 테스트 외부 :{" "}
            <img src={"https://ipfs.io/ipfs/" + imageSavedPath} alt="logo" loading="lazy"></img>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <DrawerMain editorAddStamp={editorAddStamp}></DrawerMain>
      </Grid>
      <Grid item xs={10}>
        <Container sx={{ mt: "30px" }}>
          <Grid container spacing={0} direction="column" alignItems="center">
            <ImageEditor
              ref={editorRef}
              includeUI={{
                // 기본사진 (최초 로딩 1회 있어야 작동 시작함)
                loadImage: {
                  // path: "https://ipfs.io/ipfs/QmXRhj2jj3TJFHMq5C1qsxskcbTwdtAb1LSgeL6neT6MP8",
                  path: "https://nfticket.plus/showipfs/ipfs/QmXRhj2jj3TJFHMq5C1qsxskcbTwdtAb1LSgeL6neT6MP8",
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
          <hr />
          <Grid container spacing={0} direction="column" alignItems="flex-end" sx={{ my: 2 }}>
            <Button variant="contained" onClick={editorToBase64}>
              저장하기
            </Button>
          </Grid>
          {/* <ImageSavedShow /> */}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Decorate;
