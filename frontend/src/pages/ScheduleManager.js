import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatepickerComponent from "../components/DatepickerComponent";
import InputEditor from "../components/InputEditor";
import InputList from "../components/InputList";
import PosterImage from "../components/PosterImage";
// import { showScheduleManagerContract } from "../utils/web3Config";
import { showScheduleManagerContract } from "../utils/web3";
import axios from "axios";

function ScheduleManager() {
  const navigate = useNavigate();
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
    resellPriceLimit: 1000000,
    ticketInfo: [], // 티켓 설정
  });
  const [apiData, setApiData] = useState({
    category_name: "",
    name: "",
    description: "",
    running_time: 0,
    age_limit: 0,
    poster_uri: "",
    video_uri: "http://video...",
    default_ticket_image_uri: "http://image...",
  });
  const handleApiChange = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value });
  };

  // 🎫 좌석 가격 관련 state, 메서드
  const dataId = useRef(0);
  const [data, setData] = useState([]);
  // input값이 변할 때 적용되는 함수
  const handleInfoChange = (e) => {
    setDetailInfo({ ...detailInfo, [e.target.name]: e.target.value });
  };
  // 아이템 배열에 새로운 아이템 추가
  const onCreate = (grade, price, seats) => {
    const newItem = { grade, price, seats, id: dataId.current };
    dataId.current++;
    setData([newItem, ...data]);
    setTicketClassNames([newItem.grade, ...ticketClassNames]);
    setTicketClassPrices([newItem.price, ...ticketClassPrices]);
    setTicketClassMaxMintCounts([newItem.seats, ...ticketClassMaxMintCounts]);
  };
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  //Redux 사용 account
  const account = useSelector((state) => state.wallet.accountInfo);
  // console.log(`acc: ${userData.account}`);

  // detailInfo에 좌석 가격 관련 정보 추가
  useEffect(() => {
    setDetailInfo({ ...detailInfo, ticketInfo: data });
    // console.log(data[0].grade);
    // console.log(ticketClassNames);
  }, [data]);

  // 📤 '제출' 버튼 클릭 시 동작 - 초기화
  const handleSubmit = () => {
    console.log(detailInfo);
    setDetailInfo({
      showId: 0,
      stageName: "", // 장소
      startedAt: "", // 판매 시작 시점,
      endedAt: "", // 판매 종료 시점
      maxMintCount: "",
      isResellAvailable: false,
      resellRoyaltyRatePercent: "",
      resellPriceLimit: "",
      ticketInfo: [], // 티켓 설정
    });
    setData([]);
    setTicketClassNames([]);
    setTicketClassPrices([]);
    setTicketClassMaxMintCounts([]);
  };

  // 민트 관련 함수
  const handleMint = async () => {
    try {
      const response = await showScheduleManagerContract.methods
        .create(
          parseInt(detailInfo.showId),
          detailInfo.stageName,
          detailInfo.startedAt,
          detailInfo.endedAt,
          parseInt(detailInfo.maxMintCount),
          ticketClassNames,
          ticketClassPrices,
          ticketClassMaxMintCounts,
          detailInfo.isResellAvailable,
          parseInt(detailInfo.resellRoyaltyRatePercent),
          parseInt(detailInfo.resellPriceLimit)
        )
        // .send({ from: userData.account });
        .send({ from: account });
      console.log(response);
      if (response.status) {
        // console.log("helo");
        // handleSubmit();
        handleApi();
        navigate("/Detail");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApi = () => {
    console.log(apiData);
    axios
      .post(`https://j6a102.p.ssafy.io/api/v1/show/`, {
        category_name: apiData.category_name,
        name: apiData.name,
        description: apiData.description,
        running_time: parseInt(apiData.running_time),
        age_limit: parseInt(apiData.age_limit),
        poster_uri: apiData.poster,
        video_uri: apiData.video_uri,
        default_ticket_image_uri: apiData.default_ticket_image_uri,
      })
      .then((res) => {
        console.log(res);
        // setApiData({
        //   category_name: "",
        //   name: "",
        //   description: "",
        //   running_time: 0,
        //   age_limit: 0,
        //   poster_uri: "",
        //   video_uri: "http://video...",
        //   default_ticket_image_uri: "http://image...",
        // });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleDate = ({ startDate, endDate }) => {
  //   setDetailInfo({
  //     ...detailInfo,
  //     startedAt: startDate,
  //     endedAt: endDate,
  //   });
  // };

  return (
    <>
      <h1>Schedule Manager</h1>
      <div>
        <h2>Mint</h2>
        <div>
          공연 이름:
          <input
            name="showId"
            type="number"
            value={detailInfo.showId}
            onChange={handleInfoChange}
            placeholder="showId"
          />
        </div>
        <div>
          공연 장소:
          <input
            name="stageName"
            type="text"
            value={detailInfo.stageName}
            onChange={handleInfoChange}
            placeholder="stageName"
          />
        </div>
        <DatepickerComponent detailInfo={detailInfo} setDetailInfo={setDetailInfo} />
        {/* <DatepickerComponent handleDate={handleDate} /> */}
        <div>
          총 발행 갯수:
          <input
            name="maxMintCount"
            type="number"
            value={detailInfo.maxMintCount}
            onChange={handleInfoChange}
            placeholder="maxMintCount"
          />
        </div>

        <div>
          좌석 관련 정보:
          <InputEditor onCreate={onCreate} />
          <InputList inputList={data} />
        </div>
        <div>
          재판매 가능 여부:
          <input
            type="checkbox"
            onClick={() =>
              setDetailInfo({ ...detailInfo, isResellAvailable: !detailInfo.isResellAvailable })
            }
          />
          <div>
            로열티 퍼센트:
            <input
              type="number"
              name="resellRoyaltyRatePercent"
              value={detailInfo.resellRoyaltyRatePercent}
              onChange={handleInfoChange}
              disabled={!detailInfo.isResellAvailable}
            />
          </div>
          <div>
            최대 판매 금액:
            <input
              type="number"
              name="resellPriceLimit"
              value={detailInfo.resellPriceLimit}
              onChange={handleInfoChange}
              disabled={!detailInfo.isResellAvailable}
            />
          </div>
        </div>
      </div>
      <div>
        <h2>API</h2>
        <div>
          카테고리
          <input
            type="text"
            name="category_name"
            value={apiData.category_name}
            onChange={handleApiChange}
          />
        </div>
        <div>
          공연명
          <input type="text" name="name" value={apiData.name} onChange={handleApiChange} />
        </div>
        <div>
          공연설명
          <input
            type="text"
            name="description"
            value={apiData.description}
            onChange={handleApiChange}
          />
        </div>
        <div>
          공연시간:
          <input
            type="number"
            name="running_time"
            value={apiData.running_time}
            onChange={handleApiChange}
          />
        </div>
        <div>
          관람연령:
          <input
            type="number"
            name="age_limit"
            value={apiData.age_limit}
            onChange={handleApiChange}
          />
        </div>
        <div>
          포스터:
          <PosterImage apiData={apiData} setApiData={setApiData} />
        </div>
        <button onClick={handleApi}>제출</button>
        <div>
          <button onClick={handleMint}>민트</button>
        </div>
      </div>
    </>
  );
}

export default ScheduleManager;
