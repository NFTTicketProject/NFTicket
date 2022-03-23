import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import DatepickerComponent from "../components/DatepickerComponent";
import TicketList from "../components/TicketList";

function Detail() {
  // api 보내기 위해 최종 정리한 데이터
  const [apiData, setApiData] = useState({});
  // state
  const [detailInfo, setDetailInfo] = useState({
    poster: "", // 포스터
    location: "", // 장소
    startDate: "", // 판매 시작 시점,
    endDate: "", // 판매 종료 시점
    runningtime: "", // 공연시간
    rating: "", // 관람연령
    casting: "", // 캐스팅
    seat: "", // 좌석설정
    ticketInfo: [], // 티켓 설정
  });
  // input값이 변할 때 적용되는 함수
  const handleInfoChange = (e) => {
    setDetailInfo({ ...detailInfo, [e.target.name]: e.target.value });
  };
  // 달력 관련 공연 일자 state(date)
  const [value, onChange] = useState(new Date());
  // 이미지 파일(string)
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const [loaded, setLoaded] = useState(false);

  // 이미지 저장 관련 함수
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setLoaded(true);
    };
  };
  console.log(`img url: ${image.preview_URL}`);

  // '제출' 버튼 클릭 시 동작
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
      seat: "", // 좌석설정
      ticketInfo: [], // 티켓 설정
    });
    // 여기 아래에 api 요청 보내면 됨
  };

  // 확인용 - 나중에 삭제
  useEffect(() => {
    console.log(apiData);
  }, [handleSubmit]);

  return (
    <>
      <h1>Detail</h1>
      <div>
        <p>포스터</p>
        {/* 직접 이미지 올리는거로 */}
        <input
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
        </div>
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
        {/* <input
          name="forsale"
          type="text"
          value={detailInfo.forsale}
          onChange={handleInfoChange}
          placeholder="2021.10.19~2022.05.08"
        /> */}
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
        {/* <TicketList
          detailInfo={detailInfo}
          setDetailInfo={setDetailInfo}
          tickets={tickets}
          setTickets={setTickets}
        /> */}
        <TicketList />
      </div>
      <div>
        <p>공연일자</p>
        <Calendar onChange={onChange} value={value} />
        <div className="text-gray-500 mt-4"></div>
      </div>

      <div>
        재판매 가능 여부:
        <input type="checkbox" />
      </div>
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}

export default Detail;
