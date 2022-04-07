import React from "react";

function InputItem({ grade, price, seats }) {
  return (
    <div>
      <div>
        <h4>등급: {grade}</h4>
        <h4>가격: {price}</h4>
        <h4>발행 수: {seats}</h4>
        <hr />
      </div>
    </div>
  );
}

export default InputItem;
