import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { showScheduleManagerContract } from "../utils/web3Config";
import { web3, showScheduleAbi, showScheduleManagerContract } from "../utils/web3";

function Detail() {
  const navigate = useNavigate();
  const [contractSchedule, setContractSchedule] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userAccount"));

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

  useEffect(() => {
    console.log(contractSchedule);
  });

  return (
    <div>
      <h1>Detail</h1>
      {contractSchedule.map((it, idx) => (
        <div>
          <div>showScheduleAddress = {contractSchedule[idx]}</div>
          <button
            onClick={() => {
              navigate(`/Detail/${contractSchedule[idx]}`);
            }}
          >
            정보
          </button>
        </div>
      ))}
    </div>
  );
}

export default Detail;
