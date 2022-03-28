import React, { useState } from "react";
import CreateImage from "./CreateImage";

function InputEditor({ onCreate }) {
  const [state, setState] = useState({ grade: "", seats: "", price: "", image: "" });

  const handleChangeState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate(state.grade, state.seats, state.price, info.ipfsHash);
    // 초기화
    setState({
      grade: "",
      seats: "",
      price: "",
      image: "",
    });
    setInfo({
      ipfsHash: null,
      buffer: "",
      image_file: "",
      preview_URL: "",
    });
  };

  const IPFS = require("ipfs-api");
  // const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
  const ipfs = new IPFS({ host: "j6a102.p.ssafy.io", port: '/ipfs', protocol: "https" });
  // const ipfs = new IPFS({ host: "j6a102.p.ssafy.io", port: '5001', protocol: "https" });

  const [info, setInfo] = useState({
    ipfsHash: null,
    buffer: "",
    image_file: "",
    preview_URL: "",
  });

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
    console.log(`buffer: ${info.buffer}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await ipfs.add(info.buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err);
      }
      console.log(ipfsHash);
      setInfo({ ipfsHash: ipfsHash[0].hash });
      setState({ ...state, image: ipfsHash[0].hash });
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="grade"
          placeholder="등급"
          value={state.grade}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <input
          type="text"
          name="seats"
          placeholder="좌석 수"
          value={state.seats}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <input
          type="text"
          name="price"
          placeholder="가격"
          value={state.price}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <input
          type="text"
          name="image"
          placeholder="이미지"
          value={state.image}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <button onClick={handleSubmit}>추가</button>
        <form>
          <input type="file" onChange={captureFile} />
          <button bsStyle="primary" type="submit" onClick={onSubmit}>
            등록
          </button>
        </form>
      </div>
    </>
  );
}

export default InputEditor;
