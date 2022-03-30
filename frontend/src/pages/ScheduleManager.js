import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatepickerComponent from "../components/DatepickerComponent";
import InputEditor from "../components/InputEditor";
import InputList from "../components/InputList";
import PosterImage from "../components/PosterImage";
// import { showScheduleManagerContract } from "../utils/web3Config";
import { showScheduleManagerContract } from "../utils/web3";

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
  const [apiData, setApiData] = useState({});
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
  // console.log(`acc: ${userData.account}`);

  // detailInfo에 좌석 가격 관련 정보 추가
  useEffect(() => {
    setDetailInfo({ ...detailInfo, ticketInfo: data });
    // console.log(data[0].grade);
    console.log(ticketClassNames);
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
          parseInt(detailInfo.isResellAvailable),
          parseInt(detailInfo.resellRoyaltyRatePercent),
          parseInt(detailInfo.resellPriceLimit)
        )
        .send({ from: userData.account });
      console.log(response);
      if (response.status) {
        console.log("helo");
        handleSubmit();
        navigate("/Detail");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(data);
  }, []);

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
        <button onClick={handleSubmit}>제출</button>
        <button onClick={handleMint}>민트</button>
      </div>
      <div>
        <h2>API</h2>
        <div>
          포스터:
          <PosterImage apiData={apiData} setApiData={setApiData} />
        </div>
        <div>
          관람연령:
          <input type="text" name="rating" value={apiData.rating} onChange={handleApiChange} />
        </div>
        <div>
          캐스팅:
          <input type="text" name="casting" value={apiData.casting} onChange={handleApiChange} />
        </div>
        <div>
          공연시간:
          <input
            type="text"
            name="runningTime"
            value={apiData.runningTime}
            onChange={handleApiChange}
          />
        </div>
        <button
          onClick={() => {
            console.log(apiData);
          }}
        >
          제출
        </button>
      </div>
    </>
  );
}

export default ScheduleManager;
