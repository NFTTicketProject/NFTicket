import React from "react";

function InputItem({ grade, seats, price, image }) {
  return (
    <div>
      <div>
        <h4>등급: {grade}</h4>
        <h4>좌석 수: {seats}</h4>
        <h4>가격: {price}</h4>
        <h4>이미지: {image}</h4>
        <hr />
      </div>
    </div>
  );
}

export default InputItem;
