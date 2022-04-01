/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowList from "../components/ShowList";
import { showScheduleManagerContract } from "../utils/web3Config";
// import { web3, showScheduleAbi, showScheduleManagerContract } from "../utils/web3";

function Detail() {
  const [contractSchedule, setContractSchedule] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  // showScheduleAddress 받아오기(showScheduleManagerContract 통해서)
  const getShowScheduleAddress = async () => {
    try {
      const scheduleCount = await showScheduleManagerContract.methods.getCount().call();

      const tmpContractArray = [];
      for (let i = 1; i <= scheduleCount; i++) {
        const showSchedule = await showScheduleManagerContract.methods.getShowSchedule(i).call();
        tmpContractArray.push(showSchedule);
      }
      setContractSchedule(tmpContractArray);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShowScheduleAddress();
  }, []);

  return (
    <div>
      <h1>Detail</h1>
      <ShowList contractSchedule={contractSchedule} />
    </div>
  );
}

export default Detail;
