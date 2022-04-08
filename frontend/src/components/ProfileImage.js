/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

function ProfileImage({ userInfo, setUserInfo }) {
  const IPFS = require("ipfs-api");
  const ipfs = new IPFS({ host: "nfticket.plus", port: "/ipfs", protocol: "https" });

  const [info, setInfo] = useState({
    ipfsHash: null,
    buffer: "",
    image_file: "",
    preview_URL: "",
  });
  // 파일 저장
  const saveFileImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = () => convertToBuffer(fileReader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setInfo({ buffer });
    // console.log(`buffer: ${info.buffer}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await ipfs.add(info.buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err);
      }
      // console.log(ipfsHash[0].hash);
      setInfo({ ipfsHash: ipfsHash[0].hash });
      //
      setUserInfo({ ...userInfo, image_uri: ipfsHash[0].hash });
    });
  };

  // useEffect(() => {
  //   setUserInfo({ ...userInfo, image_uri: `https://ipfs.io/ipfs/${info.ipfsHash}` });
  // }, [info]);

  const handleError = (e) => {
    e.target.src = "../images/MetaMask_Fox.svg.png";
  };

  return (
    <>
      <div>
        <img
          src={`https://ipfs.io/ipfs/${userInfo.image_uri}`}
          alt="sample"
          onError={handleError}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "150px",
            height: "150px",
            margin: "auto",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: '1.2rem'
          }}
        />
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: '1.5rem'
          }}
        >
          <input name="imgUpload" type="file" accept="image/*" onChange={saveFileImage} />
          <Button onClick={onSubmit}>저장</Button>
          {/* <button onClick={onSubmit}>저장</button> */}
        </div>
      </div>
    </>
  );
}

export default ProfileImage;
