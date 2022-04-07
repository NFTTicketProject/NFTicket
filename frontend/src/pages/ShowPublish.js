import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import styled from "styled-components";

// components
import InputEditor from "../components/ShowPublish/InputEditor";
import InputList from "../components/ShowPublish/InputList";

// mui
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import Checkbox from "@mui/material/Checkbox";

import { showScheduleManagerContract } from "../utils/web3Config";
import axios from "axios";

const TopCss = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;

// Top Left
const TopLeftCss = styled.div`
  width: 670px;
  height: 700px;
`;

const UpperTitleArea = styled.div`
  margin: 40px;
  font-size: 36px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const TypeAndLeft = styled.div`
  margin-left: 20px;
`;

const TicketTitle = styled.h1`
  margin-left: 10px;
`;

const UnderTitle = styled.div`
  display: flex;
  justify-content: start;
`;

const PosterArea = styled.div`
  width: 300px;
  margin-left: 20px;
  margin-top: 15px;
  background-color: #D5D8DC: 
`;

const Poster = styled.img`
  width: 100%;
  margin-right: 20px;
`;

const PosterDiv = styled.div`
  width: 300px;
  height: 400px;
  background-color: #ababab: 
  margin-right: 10px;
  padding-right: 10px;
  border: 1px solid gray;
`;

const SubmitButtonArea = styled.div`
  margin-top: 30px;
`;

const TicketInfoArea = styled.div`
  display: flex;
`;

const ButtonDescArea = styled.div`
  margin-top: 300px;
`;

// Top Right
const TopRightCss = styled.div`
  width: 330px;
  height: 700px;
  margin-top: 180px;
`;

const SmallTitleCss = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-top: 16px;
  margin-left: 18px;
  margin-bottom: 18px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 15px;
`;

const DatePickerBox = styled.div`
  display: flex;
  justify-content: center;
`;

const MyDatePicker = styled(DatePicker)`
  width: 90%;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const ColorHr = styled.hr`
  border: 0.5px solid #dadee2;
`;

const CastingDivCss = styled.div`
  margin-left: 16px;
  margin-bottom: 20px;
`;

const ButtonBoxCss = styled.div`
  margin-top: 10px;
`;

const SmallInputBox = styled.input`
  width: 150px;
  height: 30px;
  margin-left: auto;
  margin-bottom: 10px;
`;

const StyledSpan = styled.span`
  font-size: 14px;
  margin-left: 16px;
`;

// Date 포맷에서 날짜 더하기
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// ShowPublish Page/////////////////////////
const ShowPublish = ({ getAccount }) => {
  const navigate = useNavigate();
  // 로컬에 저장된 나의 계정정보
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  const [startDate, setStartDate] = useState(new Date().addDays(1));
  const [endDate, setEndDate] = useState(new Date().addDays(1));
  const [isUploadImg, setIsUploadImg] = useState(false);

  // Mint로 보낼 데이터(state)
  const [ticketClassNames, setTicketClassNames] = useState([]);
  const [ticketClassPrices, setTicketClassPrices] = useState([]);
  const [ticketClassMaxMintCounts, setTicketClassMaxMintCounts] = useState([]);
  const [detailInfo, setDetailInfo] = useState({
    showId: "",
    stageName: "", // 장소
    startedAt: "", // 판매 시작 시점,
    endedAt: "", // 판매 종료 시점
    maxMintCount: "",
    isResellAvailable: false,
    resellRoyaltyRatePercent: 0,
    resellPriceLimit: 100,
    ticketInfo: [], // 티켓 설정
  });
  const [apiData, setApiData] = useState({
    category_name: "",
    name: "",
    description: "",
    running_time: null,
    age_limit: null,
    poster_uri: "none",
    video_uri: "none",
    default_ticket_image_uri: "none",
    staff: "",
  });

  // 좌석 가격 관련 state, 메서드
  const dataId = useRef(0);
  const [seatData, setSeatData] = useState([]);

  // 좌석 아이템 배열에 새로운 아이템 추가
  const onCreate = (grade, price, seats) => {
    const newItem = { grade, price, seats, id: dataId.current };
    dataId.current++;
    setSeatData([newItem, ...seatData]);
    setTicketClassNames([newItem.grade, ...ticketClassNames]);
    setTicketClassPrices([newItem.price, ...ticketClassPrices]);
    setTicketClassMaxMintCounts([newItem.seats, ...ticketClassMaxMintCounts]);
  };

  // detailInfo에 좌석 가격 관련 정보 추가
  useEffect(() => {
    setDetailInfo({ ...detailInfo, ticketInfo: seatData });
    // console.log(data[0].grade);
    // console.log(ticketClassNames);
  }, [seatData]);

  // input 변경하면 자동수정되는 handle
  const handleApiChange = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value });
  };
  const handleInfoChange = (e) => {
    setDetailInfo({ ...detailInfo, [e.target.name]: e.target.value });
  };

  // time 변경사항 저장해서 넘겨주기
  useEffect(() => {
    setDetailInfo({
      ...detailInfo,
      startedAt: parseInt((startDate.getTime() - new Date().getTime()) / 1000), // - new Date().getTime(),
      endedAt: parseInt((endDate.getTime() - new Date().getTime()) / 1000), // - new Date().getTime(),
    });
  }, [startDate, endDate]);

  // 공연등록 버튼 누르면, 정보 업로드!!
  const registerShow = async () => {
    checkAccount();
    // 첫 설정을 null로 했는데, null이라면 0으로 수정해서 날아가도록 구현
    if (detailInfo.resellRoyaltyRatePercent === null) {
      setDetailInfo({
        ...detailInfo,
        resellRoyaltyRatePercent: 0,
      });
    }
    if (detailInfo.resellPriceLimit === null) {
      setDetailInfo({
        ...detailInfo,
        resellPriceLimit: 0,
      });
    }

    // 최대 발행 갯수 자동 계산용
    const mintCnt = await ticketClassMaxMintCounts.reduce(function add(
      sum,
      currValue,
    ) {
      return sum + currValue;
    },
    0);
    try {
      // 1. api 보내기
      const res = await axios.post(`https://nfticket.plus/api/v1/show/`, {
        category_name: apiData.category_name,
        name: apiData.name,
        description: apiData.description,
        running_time: parseInt(apiData.running_time),
        age_limit: parseInt(apiData.age_limit),
        poster_uri: apiData.poster,
        video_uri: apiData.video_uri,
        default_ticket_image_uri: apiData.default_ticket_image_uri,
        staff: apiData.staff,
      });
      setDetailInfo({ ...detailInfo, showId: parseInt(res.data.show_id) });
      // 2. 민트
      const response = await showScheduleManagerContract.methods
        .create(
          parseInt(res.data.show_id),
          detailInfo.stageName,
          detailInfo.startedAt,
          detailInfo.endedAt,
          parseInt(mintCnt),
          ticketClassNames,
          ticketClassPrices,
          ticketClassMaxMintCounts,
          detailInfo.isResellAvailable,
          parseInt(detailInfo.resellRoyaltyRatePercent),
          parseInt(detailInfo.resellPriceLimit),
        )
        .send({ from: userData.account });
      if (response.status) {
        await axios.put(
          `https://nfticket.plus/api/v1/show/${res.data.show_id}/show-schedule`,
          {
            show_schedule_id:
              response.events.ShowScheduleCreated.returnValues.showScheduleId,
            address: response.events[0].address,
          },
        );
        navigate("/Show");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ipfs 사용하기
  const IPFS = require("ipfs-api");
  // const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
  const ipfs = new IPFS({
    host: "nfticket.plus",
    port: "/ipfs",
    protocol: "https",
  });

  // ipfs 이용하여 이미지 올릴 때 필요한 변수
  const [info, setInfo] = useState({
    ipfsHash: null,
    buffer: "",
    image_file: "",
    preview_URL: "",
  });

  // 포스터 올리고 ipfs에 등록하기
  const onSubmitPoster = async (e) => {
    e.preventDefault();

    await ipfs.add(info.buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err);
      } else {
        setInfo({ ipfsHash: ipfsHash[0].hash });
        setIsUploadImg(true);
      }
    });
  };

  const captureFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = () => convertToBuffer(fileReader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setInfo({ buffer });
  };

  const checkAccount = async () => {
    try {
      if (!localStorage.getItem("userAccount")) {
        swal
          .fire({
            title: "지갑을 연결해주세요.",
            icon: "warning",
            closeOnClickOutside: false,
          })
          .then(function () {
            // 이벤트
            navigate("/MyPage");
            // alert('hello')
          });
        // alert('hello')
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 포스터 uri 올리기 위한 useEffect
  useEffect(() => {
    setApiData({ ...apiData, poster: info.ipfsHash });
  }, [info]);

  return (
    <div>
      <TopCss>
        <TopLeftCss>
          <UpperTitleArea>공연 등록 📝</UpperTitleArea>
          <TypeAndLeft>
            <Stack direction='row' spacing={1}>
              {apiData.category_name !== "" && (
                <Chip label={apiData.category_name} color='default' />
              )}
              {apiData.age_limit !== null && apiData.age_limit !== "" && (
                <Chip
                  label={`${apiData.age_limit}세 이상 이용가`}
                  variant='outlined'
                />
              )}
            </Stack>
          </TypeAndLeft>

          <TicketTitle>
            <TextField
              name='name'
              type='text'
              label='공연 제목'
              placeholder='공연 제목을 적어주세요'
              variant='standard'
              value={apiData.name}
              onChange={handleApiChange}
              style={{ width: 600 }}
              inputProps={{ style: { fontSize: 36, fontWeight: "bold" } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
            />
          </TicketTitle>

          <UnderTitle>
            <form onSubmit={onSubmitPoster}>
              <PosterArea>
                {info.ipfsHash === null ? (
                  <PosterDiv></PosterDiv>
                ) : isUploadImg ? (
                  <Poster
                    src={`https://ipfs.io/ipfs/${apiData.poster}`}
                    alt='등록 버튼을 눌러주세요.'
                  ></Poster>
                ) : (
                  <ButtonDescArea>
                    파일 선택 후 등록 버튼을 눌러주세요.
                  </ButtonDescArea>
                )}
              </PosterArea>
              <SubmitButtonArea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{
                      color: "text.primary",
                      borderColor: "text.secondary",
                      borderRadius: 3,
                      py: 0.5,
                      mr: 2,
                    }}
                    variant='outlined'
                    component='label' // 이거 안해주면 작동을 안하네요..
                  >
                    파일 선택
                    <input
                      type='file'
                      accept='image/*'
                      onChange={captureFile}
                      hidden
                    />
                  </Button>
                  {/* <button type='submit'>등록</button> */}
                  <Button
                    type='submit'
                    sx={{
                      color: "text.primary",
                      borderColor: "text.secondary",
                      borderRadius: 3,
                      py: 0.5,
                    }}
                    variant='outlined'
                  >
                    등록
                  </Button>
                </div>
              </SubmitButtonArea>
            </form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginTop: "20px",
                  }}
                >
                  <th style={{ marginBottom: "28px" }}>카테고리</th>
                  <th style={{ marginBottom: "28px" }}>장소</th>
                  <th style={{ marginBottom: "28px" }}>공연 시간</th>
                  <th style={{ marginBottom: "22px" }}>관람 연령</th>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <td>
                    <TextField
                      name='category_name'
                      type='text'
                      label='카테고리'
                      variant='standard'
                      value={apiData.category_name}
                      onChange={handleApiChange}
                    />
                  </td>
                  <td>
                    <TextField
                      name='stageName'
                      type='text'
                      label='장소'
                      variant='standard'
                      value={detailInfo.stageName}
                      onChange={handleInfoChange}
                    />
                  </td>
                  <td>
                    <TextField
                      name='running_time'
                      type='number'
                      label='공연시간(분)'
                      variant='standard'
                      value={apiData.running_time}
                      onChange={handleApiChange}
                    />{" "}
                  </td>
                  <td>
                    <TextField
                      name='age_limit'
                      type='number'
                      label='관람연령'
                      variant='standard'
                      value={apiData.age_limit}
                      onChange={handleApiChange}
                    />
                  </td>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <th style={{ marginBottom: "4px" }}>공연 정보</th>
                <tb style={{ marginLeft: "10px", width: "250px" }}>
                  <TextField
                    name='description'
                    type='text'
                    label='공연 정보'
                    rows={2}
                    multiline
                    value={apiData.description}
                    onChange={handleApiChange}
                    fullWidth
                  />{" "}
                </tb>
              </div>
            </div>
          </UnderTitle>
        </TopLeftCss>

        <TopRightCss>
          <CoverBox>
            <SmallTitleCss style={{ marginTop: "20px", paddingTop: "4px" }}>
              판매 기간 선택
            </SmallTitleCss>
            <DatePickerBox>
              <MyDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect // 시간 나오게 하기
                timeFormat='HH:mm' //시간 포맷
                timeIntervals={15} // 15분 단위로 선택 가능한 box가 나옴
                timeCaption='time'
                dateFormat='yyyy-MM-dd h:mm aa'
                minDate={new Date().addDays(1)}
              />
              <p style={{ paddingLeft: "2px" }}>~</p>
              <MyDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect // 시간 나오게 하기
                timeFormat='HH:mm' //시간 포맷
                timeIntervals={15} // 15분 단위로 선택 가능한 box가 나옴
                timeCaption='time'
                dateFormat='yyyy-MM-dd h:mm aa'
                minDate={startDate}
              />
            </DatePickerBox>
            <ColorHr></ColorHr>

            <SmallTitleCss>좌석</SmallTitleCss>
            <div>
              <InputEditor onCreate={onCreate} />
              <InputList inputList={seatData} />
            </div>

            <ColorHr></ColorHr>

            <SmallTitleCss>캐스팅</SmallTitleCss>
            <CastingDivCss>
              <TextField
                name='staff'
                type='text'
                variant='outlined'
                placeholder='출연 배우'
                value={apiData.staff}
                onChange={handleApiChange}
                style={{ width: 290 }}
              />
            </CastingDivCss>

            <ColorHr></ColorHr>

            <SmallTitleCss>
              재판매 가능 여부{" "}
              <Checkbox
                onClick={() =>
                  setDetailInfo({
                    ...detailInfo,
                    isResellAvailable: !detailInfo.isResellAvailable,
                  })
                }
              />
            </SmallTitleCss>

            <ColorHr></ColorHr>

            <SmallTitleCss>로열티 설정</SmallTitleCss>
            <div>
              <StyledSpan>로열티: </StyledSpan>
              <SmallInputBox
                type='number'
                name='resellRoyaltyRatePercent'
                placeholder='로열티(%)'
                disabled={!detailInfo.isResellAvailable}
                value={detailInfo.resellRoyaltyRatePercent}
                onChange={handleInfoChange}
              ></SmallInputBox>
            </div>
            <div style={{ paddingBottom: "10px", marginBottom: "20px" }}>
              <StyledSpan>최대 판매 금액: </StyledSpan>
              <SmallInputBox
                type='number'
                name='resellPriceLimit'
                placeholder='최대 판매 금액(SSF)'
                value={detailInfo.resellPriceLimit}
                onChange={handleInfoChange}
                disabled={!detailInfo.isResellAvailable}
              ></SmallInputBox>
            </div>
          </CoverBox>

          <ButtonBoxCss>
            <Stack spacing={1}>
              <Button
                onClick={registerShow}
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                  borderColor: "text.secondary",
                  borderRadius: 3,
                  py: 1.5,
                }}
                variant='outlined'
              >
                공연등록
              </Button>
            </Stack>
          </ButtonBoxCss>
        </TopRightCss>
      </TopCss>
    </div>
  );
};

export default ShowPublish;
