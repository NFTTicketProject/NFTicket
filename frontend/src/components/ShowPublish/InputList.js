import React from "react";
import InputItem from "./InputItem";

function InputList({ inputList }) {
  return (
    <div>
      {inputList.map((it) => (
        <InputItem key={it.id} {...it} />
      ))}
    </div>
  );
}

export default InputList;
