import React, { useEffect, useState } from "react";

const PosterImage = ({ apiData, setApiData }) => {
  const IPFS = require("ipfs-api");
  // const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
  const ipfs = new IPFS({ host: "j6a102.p.ssafy.io", port: "/ipfs", protocol: "https" });

  const [info, setInfo] = useState({
    ipfsHash: null,
    buffer: "",
    image_file: "",
    preview_URL: "",
  });

  // // 이미지 저장 관련 함수
  // const saveImage = (e) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();

  //   if (e.target.files[0]) {
  //     setLoaded("loading");
  //     fileReader.readAsDataURL(e.target.files[0]);
  //   }
  //   fileReader.onload = () => {
  //     setInfo({
  //       ...info,
  //       image_file: e.target.files[0],
  //       preview_URL: fileReader.result,
  //     });
  //     setLoaded(true);
  //   };
  // };
  // console.log(`img url: ${info.preview_URL}`);
  const captureFile = (e) => {
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
      // console.log(ipfsHash);
      setInfo({ ipfsHash: ipfsHash[0].hash });
    });
  };
  // console.log(`hash: ${info.ipfsHash}`);

  useEffect(() => {
    setApiData({ ...apiData, poster: `https://ipfs.io/ipfs/${info.ipfsHash}` });
  }, [info]);

  return (
    <div className="App">
      <div>
        <img
          src={apiData.poster}
          alt="sample"
          style={{
            width: "150px",
            height: "150px",
            margin: "auto",
          }}
        />

        <form onSubmit={onSubmit}>
          <input type="file" onChange={captureFile} />
          <button bsstyle="primary" type="submit">
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default PosterImage;
