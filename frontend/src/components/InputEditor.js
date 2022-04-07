import React, { useState } from "react";

function InputEditor({ onCreate }) {
  const [state, setState] = useState({ grade: "", price: "", seats: "" });

  const handleChangeState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate(state.grade, parseInt(state.price), parseInt(state.seats));
    // 초기화
    setState({
      grade: "",
      price: "",
      seats: "",
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
          type="number"
          name="price"
          placeholder="가격"
          value={state.price}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <input
          type="number"
          name="seats"
          placeholder="발행 수"
          value={state.seats}
          onChange={handleChangeState}
        />
        &nbsp;&nbsp;
        <button onClick={handleSubmit}>추가</button>
      </div>
    </>
  );
}

export default InputEditor;
