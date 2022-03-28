import axios from "axios";
import React, { useEffect, useState } from "react";

function Settings() {
  const [userInfo, setUserInfo] = useState([]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onClickEdit = () => {};

  const getUserInfo = () => {
    if (localStorage.getItem("userAccount")) {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      // .get
      axios
        .get(`https://j6a102.p.ssafy.io/api/v1/profile/${userData.account}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // console.log(userInfo);
  return (
    <>
      <h1>Profile Settings</h1>
      <label htmlFor="username">Username</label>
      <div>
        <input
          type="text"
          name="nickname"
          placeholder="Enter Nickname"
          value={userInfo.nickname}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="description">Description</label>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={userInfo.description}
          onChange={handleChange}
        />
      </div>
      <button onClick={onClickEdit}>수정</button>
    </>
  );
}

export default Settings;
