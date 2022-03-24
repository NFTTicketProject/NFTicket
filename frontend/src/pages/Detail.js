import React, { useEffect, useRef, useState } from "react";
import CreateImage from "../components/CreateImage";
import DatepickerComponent from "../components/DatepickerComponent";
import InputEditor from "../components/InputEditor";
import InputList from "../components/InputList";

function Detail() {
  // 📡 api 보내기 위해 최종 정리한 데이터
  const [apiData, setApiData] = useState({});
  // api로 보낼 데이터(state)
  const [detailInfo, setDetailInfo] = useState({
    poster: "", // 포스터
    location: "", // 장소
    startDate: "", // 판매 시작 시점,
    endDate: "", // 판매 종료 시점
    runningtime: "", // 공연시간
    rating: "", // 관람연령
    casting: "", // 캐스팅
    minPrice: 1, // 최소 판매 가격
    maxPrice: 10, // 최대 판매 가격
    ticketInfo: [], // 티켓 설정
  });

  // 🎫 좌석 가격 관련 state, 메서드
  const dataId = useRef(0);
  const [data, setData] = useState([]);
  // input값이 변할 때 적용되는 함수
  const handleInfoChange = (e) => {
    setDetailInfo({ ...detailInfo, [e.target.name]: e.target.value });
  };
  // 아이템 배열에 새로운 아이템 추가
  const onCreate = (grade, seats, price, image) => {
    const newItem = { grade, seats, price, image, id: dataId.current };
    dataId.current++;
    setData([newItem, ...data]);
  };
  // detailInfo에 좌석 가격 관련 정보 추가
  useEffect(() => {
    setDetailInfo({ ...detailInfo, ticketInfo: data });
  }, [data]);

  // 📤 '제출' 버튼 클릭 시 동작
  const handleSubmit = (e) => {
    e.preventDefault();
    setApiData(detailInfo);
    // 초기화
    setDetailInfo({
      poster: "", // 포스터
      location: "", // 장소
      startDate: "", // 판매 시작 시점,
      endDate: "", // 판매 종료 시점
      runningtime: "", // 공연시간
      rating: "", // 관람연령
      casting: "", // 캐스팅
      minPrice: 1, // 최소 판매 가격
      maxPrice: 10, // 최대 판매 가격
      ticketInfo: [], // 티켓 설정
    });
    setData([]);
    // 여기 아래에 api 요청 보내면 됨
  };

  const [toggle, setToggle] = useState(false);

  // ✅ 확인용 - 나중에 삭제
  useEffect(() => {
    console.log(apiData);
  }, [handleSubmit]);

  return (
    <>
      <h1>Detail</h1>
      <div>
        <p>포스터</p>
        <CreateImage detailInfo={detailInfo} setDetailInfo={setDetailInfo} />
        {detailInfo.poster ? <div>{detailInfo.poster}</div> : <div></div>}
        {/* <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          // style={{ display: 'none' }}
        />
        <div>
          {loaded === false || loaded === true ? (
            <img
              src={image.preview_URL}
              alt=""
              style={{ width: "200px", height: "200px", border: "none" }}
            />
          ) : (
            <div>이미지 로딩</div>
          )}
        </div> */}
      </div>
      <div>
        <p>장소</p>
        <input
          name="location"
          type="text"
          value={detailInfo.location}
          onChange={handleInfoChange}
          placeholder="샤롯데씨어터"
          // style={{ border: 'none' }}
        />
        <p>판매 기간</p>
        <DatepickerComponent detailInfo={detailInfo} setDetailInfo={setDetailInfo} />
        <p>공연 시간</p>
        <input
          name="runningtime"
          type="text"
          value={detailInfo.runningtime}
          onChange={handleInfoChange}
          placeholder="170분"
        />
        <p>관람 연령</p>
        <input
          name="rating"
          type="text"
          value={detailInfo.rating}
          onChange={handleInfoChange}
          placeholder="14세 이상"
        />
        <div>
          <p>캐스팅</p>
          <input
            name="casting"
            type="text"
            value={detailInfo.casting}
            onChange={handleInfoChange}
            placeholder="배우1, 배우2, ..."
          />
        </div>

        <p>좌석 관련 가격</p>
        <InputEditor onCreate={onCreate} />
        <InputList inputList={data} />
      </div>
      <div>
        <p>재판매 가능 여부</p>
        <input type="checkbox" onClick={() => setToggle(!toggle)} />
        <div>
          최대 가격:
          <input
            type="text"
            name="maxPrice"
            value={detailInfo.maxPrice}
            onChange={handleInfoChange}
            disabled={!toggle}
          />
        </div>
        <div>
          최소 가격:
          <input
            type="text"
            name="minPrice"
            value={detailInfo.minPrice}
            onChange={handleInfoChange}
            disabled={!toggle}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}

export default Detail;
