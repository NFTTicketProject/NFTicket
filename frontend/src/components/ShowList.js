import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ShowList({ contractSchedule }) {
  const navigate = useNavigate();
  return (
    <div>
      {contractSchedule.map((it, idx) => (
        <div key={idx}>
          {localStorage.getItem(`${it}Cancelled`) ? (
            <></>
          ) : (
            <>
              <div>showScheduleAddress = {it}</div>
              {/* <Link to={`/Detail/${it}`}>정보</Link> */}
              <button
                onClick={() => {
                  navigate(`/Detail/${it}`);
                }}
              >
                정보
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowList;
