import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatepickerComponent = ({ detailInfo, setDetailInfo }) => {
  // const DatepickerComponent = ({ handleDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 변경사항 저장해서 넘겨주기
  useEffect(() => {
    setDetailInfo({
      ...detailInfo,
      startedAt: parseInt((startDate.getTime() - new Date().getTime()) / 1000), // - new Date().getTime(),
      // startedAt: parseInt(startDate.getTime() / 1000),
      endedAt: parseInt((endDate.getTime() - new Date().getTime()) / 1000), // - new Date().getTime(),
      // endedAt: parseInt(endDate.getTime() / 1000), // - new Date().getTime(),
    });
    // console.log("보낸값 : ", (startDate.getTime() - new Date().getTime()) / 1000);
  }, [startDate, endDate]);
  // useEffect(() => {
  //   handleDate(
  //     startDate.getTime() - new Date().getTime(),
  //     endDate.getTime() - new Date().getTime()
  //   );
  // }, [startDate, endDate]);

  const handleDateChange = () => {
    setStartDate();
  };

  return (
    <>
      startedAt:
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect // 시간 나오게 하기
        timeFormat="HH:mm" //시간 포맷
        timeIntervals={15} // 15분 단위로 선택 가능한 box가 나옴
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      endedAt:
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect // 시간 나오게 하기
        timeFormat="HH:mm" //시간 포맷
        timeIntervals={15} // 15분 단위로 선택 가능한 box가 나옴
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </>
  );
};

export default DatepickerComponent;
