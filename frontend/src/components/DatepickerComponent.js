import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatepickerComponent = ({ detailInfo, setDetailInfo }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(startDate);
  console.log(endDate);

  // 변경사항 저장해서 넘겨주기
  useEffect(() => {
    setDetailInfo({ ...detailInfo, startDate: startDate, endDate: endDate });
  }, [startDate, endDate]);

  return (
    <>
      From:
      <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
      To:
      <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
    </>
  );
};

export default DatepickerComponent;
