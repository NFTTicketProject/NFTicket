import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatepickerComponent = ({ detailInfo, setDetailInfo }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // console.log(startDate);
  // console.log(endDate);

  // 변경사항 저장해서 넘겨주기
  useEffect(() => {
    setDetailInfo({
      ...detailInfo,
      startedAt: startDate.getTime() - new Date().getTime(),
      endedAt: endDate.getTime() - new Date().getTime(),
    });
  }, [startDate, endDate]);

  return (
    <>
      startedAt:
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect // 시간 나오게 하기
        timeFormat="HH:mm" //시간 포맷
        timeIntervals={15} // 15분 단위로 선택 가능한 box가 나옴
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      endedAt:
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
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
